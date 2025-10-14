import { useEffect, useRef, useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Filter, X } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import "leaflet-fullscreen/dist/Leaflet.fullscreen";
import Papa from "papaparse";

interface StratigraphicSection {
  id: string;
  name: string;
  period: string;
  ageMinMa: number;
  ageMaxMa: number;
  terrane: string;
  rockType: string;
  lat: number;
  lng: number;
  description: string;
  photoUrl: string;
  dataSourceDoi: string;
}

interface RadiometricData {
  id: string;
  sectionId: string;
  isotopeSystem: string;
  mineral: string;
  ageMa: number;
  errorMa: number;
  labMethod: string;
  reference: string;
  doi: string;
  notes: string;
}

const MapView = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markersLayer = useRef<L.MarkerClusterGroup | null>(null);

  const [sections, setSections] = useState<StratigraphicSection[]>([]);
  const [radiometricData, setRadiometricData] = useState<RadiometricData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLegend, setShowLegend] = useState(true);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [ageRange, setAgeRange] = useState([538, 635]);
  const [selectedIsotopes, setSelectedIsotopes] = useState<string[]>([]);
  const [selectedTerranes, setSelectedTerranes] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Load CSV data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [sectionsRes, radiometricRes] = await Promise.all([
          fetch("/data/stratigraphic_sections.csv"),
          fetch("/data/radiometric_data.csv"),
        ]);

        const sectionsText = await sectionsRes.text();
        const radiometricText = await radiometricRes.text();

        const sectionsParsed = Papa.parse<StratigraphicSection>(sectionsText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });

        const radiometricParsed = Papa.parse<RadiometricData>(radiometricText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });

        setSections(sectionsParsed.data);
        setRadiometricData(radiometricParsed.data);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Get unique filter options
  const isotopeOptions = useMemo(() => {
    const isotopes = new Set(radiometricData.map((d) => d.isotopeSystem));
    return Array.from(isotopes).sort();
  }, [radiometricData]);

  const terraneOptions = useMemo(() => {
    const terranes = new Set(sections.map((s) => s.terrane));
    return Array.from(terranes).sort();
  }, [sections]);

  // Combine sections with radiometric data
  const enrichedSections = useMemo(() => {
    return sections.map((section) => {
      const relatedData = radiometricData.filter(
        (data) => data.sectionId === section.id
      );
      return { ...section, radiometricData: relatedData };
    });
  }, [sections, radiometricData]);

  // Apply filters
  const filteredSections = useMemo(() => {
    return enrichedSections.filter((section) => {
      // Search filter
      if (
        searchTerm &&
        !section.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !section.terrane.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Age range filter
      const sectionAge = (section.ageMinMa + section.ageMaxMa) / 2;
      if (sectionAge < ageRange[0] || sectionAge > ageRange[1]) {
        return false;
      }

      // Isotope system filter
      if (selectedIsotopes.length > 0) {
        const hasIsotope = section.radiometricData.some((data) =>
          selectedIsotopes.includes(data.isotopeSystem)
        );
        if (!hasIsotope) return false;
      }

      // Terrane filter
      if (selectedTerranes.length > 0 && !selectedTerranes.includes(section.terrane)) {
        return false;
      }

      return true;
    });
  }, [enrichedSections, searchTerm, ageRange, selectedIsotopes, selectedTerranes]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = L.map(mapContainer.current).setView([25, 50], 5);

    // Add fullscreen control
    if (map.current && (L.control as any).fullscreen) {
      (L.control as any).fullscreen({
        position: 'topleft'
      }).addTo(map.current);
    }

    // Define base map layers
    const baseMaps = {
      "Street Map": L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }),
      "Satellite": L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        attribution: '© Esri, Maxar, Earthstar Geographics',
        maxZoom: 19,
      }),
      "Terrain": L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
        attribution: '© OpenTopoMap contributors',
        maxZoom: 17,
      }),
      "Light": L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '© OpenStreetMap, © CartoDB',
        maxZoom: 19,
      }),
    };

    // Add default layer
    baseMaps["Street Map"].addTo(map.current);

    // Add layer control
    L.control.layers(baseMaps).addTo(map.current);

    markersLayer.current = L.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 50,
    });

    map.current.addLayer(markersLayer.current);

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Update markers when filtered data changes
  useEffect(() => {
    if (!markersLayer.current || loading) return;

    markersLayer.current.clearLayers();

    filteredSections.forEach((section) => {
      const marker = L.marker([section.lat, section.lng]);

      const radiometricInfo = section.radiometricData
        .map(
          (d) =>
            `<div class="text-sm">
              <strong>${d.isotopeSystem}</strong> (${d.mineral}): ${d.ageMa} ± ${d.errorMa} Ma
              <br/><em>${d.reference}</em>
            </div>`
        )
        .join("<hr class='my-2'/>");

      marker.bindPopup(`
        <div style="min-width: 200px;">
          <h3 class="font-bold text-base mb-2">${section.name}</h3>
          <p class="text-sm mb-2"><strong>Terrane:</strong> ${section.terrane}</p>
          <p class="text-sm mb-2"><strong>Rock Type:</strong> ${section.rockType}</p>
          <p class="text-sm mb-2"><strong>Age Range:</strong> ${section.ageMinMa}–${section.ageMaxMa} Ma</p>
          ${radiometricInfo ? `<hr class="my-2"/><div class="text-xs">${radiometricInfo}</div>` : ""}
        </div>
      `);

      markersLayer.current!.addLayer(marker);
    });
  }, [filteredSections, loading]);

  const clearFilters = () => {
    setSearchTerm("");
    setAgeRange([538, 635]);
    setSelectedIsotopes([]);
    setSelectedTerranes([]);
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold mb-4">
            Interactive Geological Map
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Explore radiometrically dated stratigraphic sections across the Middle East.
            Use filters to refine your search through thousands of data points.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden shadow-elegant relative">
              <div ref={mapContainer} className="w-full h-[600px]" />
              
              {/* Legend toggle button */}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowLegend(!showLegend)}
                className="absolute bottom-4 left-4 z-[1001] shadow-lg"
              >
                <MapPin className="w-4 h-4 mr-2" />
                {showLegend ? "Hide" : "Show"} Legend
              </Button>

              {/* Legend overlay */}
              {showLegend && (
                <Card className="absolute bottom-16 left-4 w-72 shadow-lg z-[1000]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Map Symbols</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 pt-0">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#4CAF50] text-white flex items-center justify-center text-xs font-bold shadow">
                        5
                      </div>
                      <span className="text-xs">Multiple samples (click to expand)</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <svg width="20" height="32" viewBox="0 0 25 41" className="drop-shadow">
                          <path
                            fill="#3388ff"
                            stroke="#fff"
                            strokeWidth="1"
                            d="M12.5 0C5.6 0 0 5.6 0 12.5c0 9.4 12.5 28.5 12.5 28.5S25 21.9 25 12.5C25 5.6 19.4 0 12.5 0z"
                          />
                        </svg>
                      </div>
                      <span className="text-xs">Individual sample location</span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-copper" />
                    Filters
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    {showFilters ? "Hide" : "Show"}
                  </Button>
                </div>
              </CardHeader>
              {showFilters && (
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="search">Search</Label>
                    <Input
                      id="search"
                      placeholder="Section name or terrane..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Age Range (Ma)</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm text-muted-foreground">{ageRange[0]}</span>
                      <Slider
                        min={538}
                        max={635}
                        step={1}
                        value={ageRange}
                        onValueChange={setAgeRange}
                        className="flex-1"
                      />
                      <span className="text-sm text-muted-foreground">{ageRange[1]}</span>
                    </div>
                  </div>

                  <div>
                    <Label className="mb-2 block">Isotope Systems</Label>
                    <div className="space-y-2">
                      {isotopeOptions.map((isotope) => (
                        <div key={isotope} className="flex items-center gap-2">
                          <Checkbox
                            id={`isotope-${isotope}`}
                            checked={selectedIsotopes.includes(isotope)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedIsotopes([...selectedIsotopes, isotope]);
                              } else {
                                setSelectedIsotopes(
                                  selectedIsotopes.filter((i) => i !== isotope)
                                );
                              }
                            }}
                          />
                          <Label
                            htmlFor={`isotope-${isotope}`}
                            className="text-sm cursor-pointer"
                          >
                            {isotope}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="mb-2 block">Terranes</Label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {terraneOptions.map((terrane) => (
                        <div key={terrane} className="flex items-center gap-2">
                          <Checkbox
                            id={`terrane-${terrane}`}
                            checked={selectedTerranes.includes(terrane)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedTerranes([...selectedTerranes, terrane]);
                              } else {
                                setSelectedTerranes(
                                  selectedTerranes.filter((t) => t !== terrane)
                                );
                              }
                            }}
                          />
                          <Label
                            htmlFor={`terrane-${terrane}`}
                            className="text-sm cursor-pointer"
                          >
                            {terrane}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="w-full"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear Filters
                  </Button>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
