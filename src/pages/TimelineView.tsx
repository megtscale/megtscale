import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
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

const TimelineView = () => {
  const [sections, setSections] = useState<StratigraphicSection[]>([]);
  const [loading, setLoading] = useState(true);

  // Load CSV data
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/data/stratigraphic_sections.csv");
        const text = await response.text();
        const parsed = Papa.parse<StratigraphicSection>(text, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });
        setSections(parsed.data);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const events = [
    { age: 635, event: "Marinoan glaciation ends", type: "climate", ageRange: [640, 630] },
    { age: 610, event: "First appearance of Ediacaran biota", type: "biological", ageRange: [615, 605] },
    { age: 580, event: "Gaskiers glaciation", type: "climate", ageRange: [585, 575] },
    { age: 560, event: "Rise of complex macroscopic life", type: "biological", ageRange: [570, 550] },
    { age: 541, event: "Cambrian explosion begins", type: "biological", ageRange: [545, 538] },
    { age: 538, event: "Ediacaran Period ends", type: "boundary", ageRange: [540, 538] },
  ];

  // Find related sections for each event
  const getRelatedSections = (ageRange: number[]) => {
    return sections.filter(section => 
      (section.ageMinMa <= ageRange[1] && section.ageMaxMa >= ageRange[0])
    );
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold mb-4">
            Geological Time Scale Explorer
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Navigate through 97 million years of Ediacaran history. This interactive timeline
            shows major geological and biological events during the assembly of the Arabian Plate.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">635 Ma</CardTitle>
              <CardDescription>Period Start</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">538 Ma</CardTitle>
              <CardDescription>Period End</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">97 My</CardTitle>
              <CardDescription>Duration</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Neoproterozoic</CardTitle>
              <CardDescription>Era</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-6 h-6 text-copper" />
              Major Events Timeline
            </CardTitle>
            <CardDescription>
              Key tectonic, climatic, and biological events during the Ediacaran Period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-copper to-secondary" />

              {/* Events */}
              <div className="space-y-6">
                {events.map((item, index) => {
                  const relatedSections = getRelatedSections(item.ageRange);
                  return (
                    <div key={index} className="relative pl-20">
                      <div className="absolute left-6 w-5 h-5 rounded-full bg-copper border-4 border-background" />
                      <div className="flex items-start gap-4">
                        <div className="min-w-[80px]">
                          <span className="font-mono font-bold text-lg text-copper">
                            {item.age} Ma
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground mb-2">{item.event}</p>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="secondary" className="text-xs">
                              {item.type}
                            </Badge>
                            {relatedSections.length > 0 && (
                              <Badge variant="outline" className="text-xs flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {relatedSections.length} location{relatedSections.length > 1 ? 's' : ''}
                              </Badge>
                            )}
                          </div>
                          
                          {relatedSections.length > 0 && (
                            <div className="bg-muted/50 rounded-lg p-3 mt-2">
                              <p className="text-xs font-medium mb-2 text-muted-foreground">
                                Related sample locations:
                              </p>
                              <div className="space-y-1">
                                {relatedSections.slice(0, 3).map(section => (
                                  <div key={section.id} className="text-xs flex items-start gap-2">
                                    <MapPin className="w-3 h-3 text-copper mt-0.5 flex-shrink-0" />
                                    <div>
                                      <span className="font-medium">{section.name}</span>
                                      <span className="text-muted-foreground"> - {section.terrane}</span>
                                      <span className="text-muted-foreground block">
                                        ({section.ageMinMa}–{section.ageMaxMa} Ma)
                                      </span>
                                    </div>
                                  </div>
                                ))}
                                {relatedSections.length > 3 && (
                                  <p className="text-xs text-muted-foreground italic">
                                    +{relatedSections.length - 3} more...
                                  </p>
                                )}
                              </div>
                              <Link to="/map">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="mt-3 w-full text-xs"
                                >
                                  <ExternalLink className="w-3 h-3 mr-1" />
                                  View on Map
                                </Button>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>About the Ediacaran Period</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p className="text-foreground">
              The Ediacaran Period (635-538 Ma) marks a critical transition in Earth's history.
              Following the end of the Marinoan glaciation ("Snowball Earth"), this period
              witnessed the emergence of complex multicellular life and significant tectonic
              reorganization, including the assembly of the Arabian Plate from multiple terranes.
            </p>
            <p className="text-foreground mt-4">
              This timeline will be enhanced with radiometric age data from stratigraphic
              sections across the Middle East, allowing precise temporal correlation of tectonic
              and stratigraphic events.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>References</CardTitle>
            <CardDescription>
              Key publications defining the Ediacaran time scale and geological events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div className="border-l-2 border-copper pl-4">
                <p className="font-medium text-foreground">
                  Gradstein, F. M., Ogg, J. G., Schmitz, M. D., & Ogg, G. M. (Eds.). (2020).
                </p>
                <p className="text-muted-foreground italic">
                  Geologic Time Scale 2020. Elsevier.
                </p>
                <a 
                  href="https://doi.org/10.1016/C2020-1-02369-3" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-copper hover:underline text-xs flex items-center gap-1 mt-1"
                >
                  DOI: 10.1016/C2020-1-02369-3
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="border-l-2 border-copper pl-4">
                <p className="font-medium text-foreground">
                  Hoffmann, K. H., Condon, D. J., Bowring, S. A., & Crowley, J. L. (2004).
                </p>
                <p className="text-muted-foreground italic">
                  U-Pb zircon date from the Neoproterozoic Ghaub Formation, Namibia: Constraints on Marinoan glaciation. 
                  Geology, 32(9), 817-820.
                </p>
                <a 
                  href="https://doi.org/10.1130/G20519.1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-copper hover:underline text-xs flex items-center gap-1 mt-1"
                >
                  DOI: 10.1130/G20519.1
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="border-l-2 border-copper pl-4">
                <p className="font-medium text-foreground">
                  Narbonne, G. M., Xiao, S., & Shields, G. A. (2012).
                </p>
                <p className="text-muted-foreground italic">
                  The Ediacaran Period. In The Geologic Time Scale 2012 (pp. 413-435). Elsevier.
                </p>
                <a 
                  href="https://doi.org/10.1016/B978-0-444-59425-9.00018-4" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-copper hover:underline text-xs flex items-center gap-1 mt-1"
                >
                  DOI: 10.1016/B978-0-444-59425-9.00018-4
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="border-l-2 border-copper pl-4">
                <p className="font-medium text-foreground">
                  Bowring, S. A., Grotzinger, J. P., Condon, D. J., Ramezani, J., Newall, M. J., & Allen, P. A. (2007).
                </p>
                <p className="text-muted-foreground italic">
                  Geochronologic constraints on the chronostratigraphic framework of the Neoproterozoic Huqf Supergroup, Sultanate of Oman.
                  American Journal of Science, 307(10), 1097-1145.
                </p>
                <a 
                  href="https://doi.org/10.2475/10.2007.01" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-copper hover:underline text-xs flex items-center gap-1 mt-1"
                >
                  DOI: 10.2475/10.2007.01
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <p className="text-xs text-muted-foreground mt-6 pt-4 border-t">
                Additional references for specific sections and radiometric ages are linked in the 
                Data Portal and individual sample locations on the map.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TimelineView;
