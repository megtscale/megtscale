import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

const TimelineView = () => {
  const events = [
    { age: 635, event: "Marinoan glaciation ends", type: "climate" },
    { age: 610, event: "First appearance of Ediacaran biota", type: "biological" },
    { age: 580, event: "Gaskiers glaciation", type: "climate" },
    { age: 560, event: "Rise of complex macroscopic life", type: "biological" },
    { age: 541, event: "Cambrian explosion begins", type: "biological" },
    { age: 538, event: "Ediacaran Period ends", type: "boundary" },
  ];

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
                {events.map((item, index) => (
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
                        <Badge variant="secondary" className="text-xs">
                          {item.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
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
      </div>
    </div>
  );
};

export default TimelineView;
