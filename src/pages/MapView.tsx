import { useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapView = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map centered on Middle East
    map.current = L.map(mapContainer.current).setView([25, 50], 5);

    // Add OpenStreetMap tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map.current);

    // Example markers for demonstration
    const sampleLocations = [
      { lat: 22.9, lng: 58.6, name: "Oman Section", age: "602.4 ± 1.8 Ma" },
      { lat: 24.5, lng: 54.4, name: "UAE Outcrop", age: "580 ± 3 Ma" },
      { lat: 26.0, lng: 50.5, name: "Bahrain Site", age: "565 ± 2.5 Ma" },
    ];

    sampleLocations.forEach((loc) => {
      L.marker([loc.lat, loc.lng])
        .addTo(map.current!)
        .bindPopup(`<strong>${loc.name}</strong><br/>Age: ${loc.age}`);
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
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
            Click on markers to view detailed information about each location.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden shadow-elegant">
              <div ref={mapContainer} className="w-full h-[600px]" />
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-copper" />
                  Map Legend
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-copper" />
                  <span className="text-sm">Radiometric Sample Sites</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Markers indicate locations with published radiometric age data.
                  More data will be added as the database grows.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-2xl font-bold text-copper">3</div>
                  <div className="text-sm text-muted-foreground">Sample Locations</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-copper">635-538 Ma</div>
                  <div className="text-sm text-muted-foreground">Time Range</div>
                </div>
                <p className="text-xs text-muted-foreground">
                  This is a demonstration. Full dataset will include hundreds of locations
                  from published research.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
