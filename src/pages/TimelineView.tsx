import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Clock, MapPin, ExternalLink, ChevronDown } from "lucide-react";
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

interface TimelineEvent {
  id: string;
  age: number;
  event: string;
  type: string;
  ageRangeMin: number;
  ageRangeMax: number;
  referenceIds: string;
  period: string;
  description: string;
}

interface Reference {
  id: string;
  authors: string;
  year: number;
  title: string;
  publication: string;
  doi: string;
}

const TimelineView = () => {
  const [sections, setSections] = useState<StratigraphicSection[]>([]);
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [references, setReferences] = useState<Reference[]>([]);
  const [loading, setLoading] = useState(true);

  // Load CSV data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [sectionsRes, eventsRes, refsRes] = await Promise.all([
          fetch("/data/stratigraphic_sections.csv"),
          fetch("/data/timeline_events.csv"),
          fetch("/data/references.csv"),
        ]);

        const [sectionsText, eventsText, refsText] = await Promise.all([
          sectionsRes.text(),
          eventsRes.text(),
          refsRes.text(),
        ]);

        const parsedSections = Papa.parse<StratigraphicSection>(sectionsText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });
        setSections(parsedSections.data);

        const parsedEvents = Papa.parse<TimelineEvent>(eventsText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });
        setEvents(parsedEvents.data);

        const parsedRefs = Papa.parse<Reference>(refsText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });
        setReferences(parsedRefs.data);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Find related sections for each event
  const getRelatedSections = (ageRangeMin: number, ageRangeMax: number) => {
    return sections.filter(section => 
      (section.ageMinMa <= ageRangeMax && section.ageMaxMa >= ageRangeMin)
    );
  };

  // Get references for an event
  const getEventReferences = (referenceIds: string) => {
    const ids = referenceIds.split(',').map(id => id.trim());
    return references.filter(ref => ids.includes(ref.id));
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-16">
        {/* Enhanced Header */}
        <div className="mb-16 text-center">
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-copper to-secondary bg-clip-text text-transparent">
            Middle East Geologic Time Scale
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Navigate through million years of geological history. This interactive timeline
            shows major geological events during the assembly of the Arabian Plate.
          </p>
          
        </div>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-6 h-6 text-copper" />
              Major Events Timeline
            </CardTitle>
            <CardDescription>
              Key tectonic, climatic, and biological events
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-copper via-primary to-secondary rounded-full" />

              {/* Events */}
              <div className="space-y-6">
                {events.map((item) => {
                  const relatedSections = getRelatedSections(item.ageRangeMin, item.ageRangeMax);
                  const eventRefs = getEventReferences(item.referenceIds);
                  
                  return (
                    <div key={item.id} className="relative pl-28">
                      <div className="absolute left-9 w-7 h-7 rounded-full bg-gradient-to-br from-copper to-primary border-4 border-background shadow-lg" />
                      <div className="flex items-start gap-6">
                        <div className="min-w-[100px]">
                          <span className="font-mono font-bold text-2xl text-copper">
                            {item.age}
                          </span>
                          <span className="font-mono text-lg text-muted-foreground ml-1">Ma</span>
                        </div>
                        <div className="flex-1">
                          <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value={item.id} className="border-none">
                              <div className="flex items-center justify-between gap-4 mb-2">
                                <div className="flex-1">
                                  <h3 className="font-semibold text-xl text-foreground mb-2">{item.event}</h3>
                                  <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="secondary" className="text-sm">
                                      {item.type}
                                    </Badge>
                                    <Badge variant="outline" className="text-sm">
                                      {item.period}
                                    </Badge>
                                    {relatedSections.length > 0 && (
                                      <Badge variant="outline" className="text-sm flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        {relatedSections.length} location{relatedSections.length > 1 ? 's' : ''}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <AccordionTrigger className="hover:no-underline">
                                  <span className="text-xs text-muted-foreground mr-2">Details</span>
                                </AccordionTrigger>
                              </div>

                              <AccordionContent>
                                <div className="space-y-4 pt-2">
                                  {/* Description */}
                                  {item.description && (
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                  )}

                                  {/* References */}
                                  {eventRefs.length > 0 && (
                                    <div className="bg-accent/10 rounded-lg p-4 border border-copper/20">
                                      <p className="text-sm font-semibold text-copper mb-3 flex items-center gap-1">
                                        <ExternalLink className="w-4 h-4" />
                                        References ({eventRefs.length}):
                                      </p>
                                      <div className="space-y-3">
                                        {eventRefs.map(ref => (
                                          <div key={ref.id} className="text-sm">
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
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  
                                  {/* Related Sections */}
                                  {relatedSections.length > 0 && (
                                    <div className="bg-muted/50 rounded-lg p-4">
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
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-2xl">About the MEGTScale</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p className="text-foreground">
              The Middle East Geologic Time Scale (MEGTScale) provides a comprehensive framework for understanding the geological evolution of the region across Earth’s history.
              This platform compiles radiometrically dated stratigraphic sections to construct a unified chronostratigraphic and tectonic reference for the Middle East.
            </p>
            <p className="text-foreground mt-4">
              The time scale integrates geochronological data, stratigraphic correlations, and major tectonic events to reconstruct how the Arabian Plate and surrounding regions developed through time.
              All datasets are linked to peer-reviewed publications and are openly accessible for research and educational use.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TimelineView;
