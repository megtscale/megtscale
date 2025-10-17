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

const references = [
  {
    id: "gradstein2020",
    authors: "Gradstein, F. M., Ogg, J. G., Schmitz, M. D., & Ogg, G. M. (Eds.)",
    year: 2020,
    title: "Geologic Time Scale 2020",
    publication: "Elsevier",
    doi: "10.1016/C2020-1-02369-3",
    relatedEvents: ["Cambrian explosion begins"]
  },
  {
    id: "hoffmann2004",
    authors: "Hoffmann, K. H., Condon, D. J., Bowring, S. A., & Crowley, J. L.",
    year: 2004,
    title: "U-Pb zircon date from the Neoproterozoic Ghaub Formation, Namibia: Constraints on Marinoan glaciation",
    publication: "Geology, 32(9), 817-820",
    doi: "10.1130/G20519.1",
    relatedEvents: ["Marinoan glaciation ends", "Gaskiers glaciation"]
  },
  {
    id: "narbonne2012",
    authors: "Narbonne, G. M., Xiao, S., & Shields, G. A.",
    year: 2012,
    title: "The Ediacaran Period",
    publication: "In The Geologic Time Scale 2012 (pp. 413-435). Elsevier",
    doi: "10.1016/B978-0-444-59425-9.00018-4",
    relatedEvents: ["First appearance of Ediacaran biota"]
  },
  {
    id: "bowring2007",
    authors: "Bowring, S. A., Grotzinger, J. P., Condon, D. J., Ramezani, J., Newall, M. J., & Allen, P. A.",
    year: 2007,
    title: "Geochronologic constraints on the chronostratigraphic framework of the Neoproterozoic Huqf Supergroup, Sultanate of Oman",
    publication: "American Journal of Science, 307(10), 1097-1145",
    doi: "10.2475/10.2007.01",
    relatedEvents: []
  },
];

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
    { 
      age: 635, 
      event: "Marinoan glaciation ends", 
      type: "climate", 
      ageRange: [640, 630],
      referenceIds: ["hoffmann2004"]
    },
    { 
      age: 610, 
      event: "First appearance of Ediacaran biota", 
      type: "biological", 
      ageRange: [615, 605],
      referenceIds: ["narbonne2012"]
    },
    { 
      age: 580, 
      event: "Gaskiers glaciation", 
      type: "climate", 
      ageRange: [585, 575],
      referenceIds: ["hoffmann2004"]
    },
    { 
      age: 560, 
      event: "Rise of complex macroscopic life", 
      type: "biological", 
      ageRange: [570, 550],
      referenceIds: ["narbonne2012"]
    },
    { 
      age: 541, 
      event: "Cambrian explosion begins", 
      type: "biological", 
      ageRange: [545, 538],
      referenceIds: ["gradstein2020"]
    },
    { 
      age: 538, 
      event: "Ediacaran Period ends", 
      type: "boundary", 
      ageRange: [540, 538],
      referenceIds: ["gradstein2020"]
    },
  ];

  // Find related sections for each event
  const getRelatedSections = (ageRange: number[]) => {
    return sections.filter(section => 
      (section.ageMinMa <= ageRange[1] && section.ageMaxMa >= ageRange[0])
    );
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-16">
        {/* Enhanced Header */}
        <div className="mb-16 text-center">
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-copper to-secondary bg-clip-text text-transparent">
            Ediacaran Time Scale
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Navigate through 97 million years of Ediacaran history. This interactive timeline
            shows major geological and biological events during the assembly of the Arabian Plate.
          </p>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="font-bold text-copper">635 Ma</span> Period Start
            </span>
            <span className="text-border">•</span>
            <span className="flex items-center gap-2">
              <span className="font-bold text-copper">538 Ma</span> Period End
            </span>
            <span className="text-border">•</span>
            <span className="flex items-center gap-2">
              <span className="font-bold text-copper">97 My</span> Duration
            </span>
          </div>
        </div>

        <Card className="shadow-elegant max-w-5xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-6 h-6 text-copper" />
              Major Events Timeline
            </CardTitle>
            <CardDescription>
              Key tectonic, climatic, and biological events during the Ediacaran Period
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-copper via-primary to-secondary rounded-full" />

              {/* Events */}
              <div className="space-y-10">
                {events.map((item, index) => {
                  const relatedSections = getRelatedSections(item.ageRange);
                  return (
                    <div key={index} className="relative pl-28">
                      <div className="absolute left-9 w-7 h-7 rounded-full bg-gradient-to-br from-copper to-primary border-4 border-background shadow-lg" />
                      <div className="flex items-start gap-6">
                        <div className="min-w-[100px]">
                          <span className="font-mono font-bold text-2xl text-copper">
                            {item.age}
                          </span>
                          <span className="font-mono text-lg text-muted-foreground ml-1">Ma</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-xl text-foreground mb-3">{item.event}</h3>
                          <div className="flex items-center gap-2 mb-4">
                            <Badge variant="secondary" className="text-sm">
                              {item.type}
                            </Badge>
                            {relatedSections.length > 0 && (
                              <Badge variant="outline" className="text-sm flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {relatedSections.length} location{relatedSections.length > 1 ? 's' : ''}
                              </Badge>
                            )}
                          </div>

                          {/* References for this event */}
                          {item.referenceIds && item.referenceIds.length > 0 && (
                            <div className="bg-accent/10 rounded-lg p-4 mb-4 border border-copper/20">
                              <p className="text-sm font-semibold text-copper mb-3 flex items-center gap-1">
                                <ExternalLink className="w-4 h-4" />
                                References:
                              </p>
                              <div className="space-y-3">
                                {item.referenceIds.map(refId => {
                                  const ref = references.find(r => r.id === refId);
                                  if (!ref) return null;
                                  return (
                                    <div key={refId} className="text-sm">
                                      <p className="font-medium text-foreground">
                                        {ref.authors} ({ref.year})
                                      </p>
                                      <p className="text-muted-foreground italic">
                                        {ref.title}
                                      </p>
                                      <a 
                                        href={`https://doi.org/${ref.doi}`}
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-copper hover:underline flex items-center gap-1 mt-1"
                                      >
                                        DOI: {ref.doi}
                                        <ExternalLink className="w-4 h-4" />
                                      </a>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                          
                          {relatedSections.length > 0 && (
                            <div className="bg-muted/50 rounded-lg p-4 mt-2">
                              <p className="text-sm font-medium mb-3 text-muted-foreground">
                                Related sample locations:
                              </p>
                              <div className="space-y-2">
                                {relatedSections.slice(0, 3).map(section => (
                                  <div key={section.id} className="text-sm flex items-start gap-2">
                                    <MapPin className="w-4 h-4 text-copper mt-0.5 flex-shrink-0" />
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
                                  <p className="text-sm text-muted-foreground italic">
                                    +{relatedSections.length - 3} more...
                                  </p>
                                )}
                              </div>
                              <Link to="/map">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="mt-4 w-full"
                                >
                                  <ExternalLink className="w-4 h-4 mr-2" />
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

        <Card className="mt-12 max-w-5xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">About the MEGTScale</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p className="text-foreground">
              The Middle East Geologic Time Scale (MEGTScale) focuses on the Ediacaran Period 
              (635-538 Ma), a critical transition in Earth history following the Marinoan 
              glaciation ("Snowball Earth"). This platform compiles radiometrically-dated 
              stratigraphic sections to build a comprehensive chronostratigraphic framework 
              for the region.
            </p>
            <p className="text-foreground mt-4">
              The time scale integrates U-Pb zircon ages, stratigraphic correlations, and 
              tectonic events to reconstruct how the Arabian Plate was assembled from multiple 
              terranes. All data are linked to peer-reviewed publications and are openly 
              accessible for research and education.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TimelineView;
