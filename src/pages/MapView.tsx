import { useEffect, useRef, useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Filter, X, ExternalLink, FileText } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import "leaflet-fullscreen/dist/Leaflet.fullscreen";
import Papa from "papaparse";

// Fix Leaflet default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

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

  // Image dialog state
  const [enlargedImage, setEnlargedImage] = useState<{ url: string; title: string } | null>(null);

  // Accordion state for auto-expanding on hash navigation
  const [expandedSection, setExpandedSection] = useState<string>("");

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [ageRange, setAgeRange] = useState([538, 635]);
  const [selectedIsotopes, setSelectedIsotopes] = useState<string[]>([]);
  const [selectedTerranes, setSelectedTerranes] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(true);

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

    // Event delegation for image clicks in popups
    mapContainer.current.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('section-photo')) {
        const photoUrl = target.getAttribute('data-photo-url');
        const sectionName = target.getAttribute('data-section-name');
        if (photoUrl && sectionName) {
          setEnlargedImage({ url: photoUrl, title: sectionName });
        }
      }
    });

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
            `<div class="text-sm mb-2">
              <strong>${d.isotopeSystem}</strong> (${d.mineral}): ${d.ageMa} ± ${d.errorMa} Ma
              <br/><em>${d.reference}</em>
              ${d.doi ? `<br/><a href="https://doi.org/${d.doi}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline text-xs">DOI: ${d.doi}</a>` : ''}
            </div>`
        )
        .join("<hr class='my-1'/>");

      marker.bindPopup(`
        <div style="min-width: 250px; max-width: 300px;">
          ${section.photoUrl ? `<img src="${section.photoUrl}" alt="${section.name}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 12px; cursor: pointer;" class="section-photo" data-photo-url="${section.photoUrl}" data-section-name="${section.name}" title="Click to enlarge" />` : ""}
          <h3 class="font-bold text-base mb-2">${section.name}</h3>
          <p class="text-sm mb-1"><strong>Terrane:</strong> ${section.terrane}</p>
          <p class="text-sm mb-1"><strong>Rock Type:</strong> ${section.rockType}</p>
          <p class="text-sm mb-2"><strong>Age Range:</strong> ${section.ageMinMa}–${section.ageMaxMa} Ma</p>
          <a href="#section-${section.id}" class="text-blue-600 hover:underline text-xs block mb-2">📊 View Full Details</a>
          ${radiometricInfo ? `<hr class="my-2"/><div class="text-xs font-semibold mb-1">Radiometric Data:</div>${radiometricInfo}` : ""}
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

  // Handle hash navigation to expand accordion
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#section-')) {
        const sectionId = hash.replace('#section-', '');
        setExpandedSection(sectionId);
        // Small delay to ensure accordion expands before scrolling
        setTimeout(() => {
          const element = document.getElementById(hash.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    };

    // Check on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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

        {/* Filters Panel - Collapsible at top */}
        {showFilters && (
          <Card className="mb-6 shadow-elegant">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-copper" />
                  Data Filters
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="search" className="text-sm font-medium">Search</Label>
                  <Input
                    id="search"
                    placeholder="Section name or terrane..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="md:col-span-2">
                  <Label className="text-sm font-medium mb-2 block">
                    Age Range (Ma)
                  </Label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <Label htmlFor="minAge" className="text-xs text-muted-foreground">Min</Label>
                        <Input
                          id="minAge"
                          type="number"
                          min={538}
                          max={635}
                          value={ageRange[0]}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 538;
                            setAgeRange([Math.min(val, ageRange[1]), ageRange[1]]);
                          }}
                          className="mt-1"
                        />
                      </div>
                      <span className="text-muted-foreground pt-6">to</span>
                      <div className="flex-1">
                        <Label htmlFor="maxAge" className="text-xs text-muted-foreground">Max</Label>
                        <Input
                          id="maxAge"
                          type="number"
                          min={538}
                          max={635}
                          value={ageRange[1]}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 635;
                            setAgeRange([ageRange[0], Math.max(val, ageRange[0])]);
                          }}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <Slider
                      min={538}
                      max={635}
                      step={1}
                      value={ageRange}
                      onValueChange={setAgeRange}
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Isotope Systems</Label>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
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
                          className="text-xs cursor-pointer"
                        >
                          {isotope}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Terranes</Label>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
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
                          className="text-xs cursor-pointer"
                        >
                          {terrane}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear All Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Toggle Filters Button */}
        {!showFilters && (
          <div className="mb-6">
            <Button
              variant="secondary"
              onClick={() => setShowFilters(true)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Show Filters
            </Button>
          </div>
        )}

        {/* Map - Full Width */}
        <Card className="overflow-hidden shadow-elegant mb-6">
          <div ref={mapContainer} className="w-full h-[600px]" />
        </Card>

        {/* Data Updates & Sources */}
        <div className="space-y-4" id="dataset-info">
          <h2 className="text-2xl font-bold">Dataset Updates & Sources</h2>
          
          {/* Individual Section Details */}
          <Accordion 
            type="single" 
            collapsible 
            className="space-y-4"
            value={expandedSection}
            onValueChange={setExpandedSection}
          >
            {filteredSections.map((section) => (
              <AccordionItem 
                key={section.id} 
                value={section.id}
                id={`section-${section.id}`}
                className="border rounded-lg shadow-elegant hover:shadow-glow transition-shadow bg-card"
              >
                <AccordionTrigger className="hover:no-underline px-6 py-3">
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="flex items-center gap-4 text-left">
                      <h3 className="text-base font-semibold">{section.name}</h3>
                      <span className="text-sm text-muted-foreground">
                        {section.ageMinMa}–{section.ageMaxMa} Ma • {section.rockType}
                      </span>
                    </div>
                    <a
                      href="/data"
                      className="flex items-center gap-1 text-blue-600 hover:underline text-xs font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FileText className="w-3 h-3" />
                      Data Portal
                    </a>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="px-6 pb-4">
                  <div className="space-y-2 text-sm pt-1">
                    <div className="flex gap-4">
                      {/* Left side - Photo */}
                      {section.photoUrl && (
                        <div className="flex-shrink-0 w-40">
                          <img 
                            src={section.photoUrl} 
                            alt={section.name}
                            className="w-full h-28 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => setEnlargedImage({ url: section.photoUrl, title: section.name })}
                          />
                        </div>
                      )}
                      
                      {/* Right side - Content */}
                      <div className="flex-1 space-y-2">
                        <div className="grid grid-cols-3 gap-3 text-xs">
                          <div>
                            <p className="font-semibold text-muted-foreground">Period</p>
                            <p>{section.period}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-muted-foreground">Terrane</p>
                            <p>{section.terrane}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-muted-foreground">Location</p>
                            <p>{section.lat.toFixed(2)}°N, {section.lng.toFixed(2)}°E</p>
                          </div>
                        </div>
                        
                        <div className="pt-1 border-t">
                          <p className="text-muted-foreground text-xs">{section.description}</p>
                        </div>
                      </div>
                    </div>

                    {section.radiometricData && section.radiometricData.length > 0 && (
                      <div className="pt-2 border-t space-y-1">
                        <h4 className="font-semibold text-xs">Radiometric Data:</h4>
                        <div className="space-y-1">
                          {section.radiometricData.map((data) => (
                            <div key={data.id} className="pl-2 border-l-2 border-copper text-xs">
                              <p className="font-medium">
                                {data.isotopeSystem} ({data.mineral}): {data.ageMa} ± {data.errorMa} Ma
                              </p>
                              <p className="text-muted-foreground">{data.reference} • {data.notes}</p>
                              {data.doi && (
                                <a 
                                  href={`https://doi.org/${data.doi}`}
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-copper hover:underline flex items-center gap-1"
                                >
                                  DOI: {data.doi}
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Image enlargement dialog */}
      <Dialog open={!!enlargedImage} onOpenChange={() => setEnlargedImage(null)}>
        <DialogContent className="max-w-4xl z-[10000]">
          {enlargedImage && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold">{enlargedImage.title}</h3>
              <img 
                src={enlargedImage.url} 
                alt={enlargedImage.title}
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MapView;
