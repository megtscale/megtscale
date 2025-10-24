import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText, ExternalLink, Clock } from "lucide-react";
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

interface CombinedData {
  id: string;
  name: string;
  terrane: string;
  ageMa: string;
  isotopeSystem: string;
  reference: string;
  doi: string;
}

const DataPortal = () => {
  const [combinedData, setCombinedData] = useState<CombinedData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDatasets, setShowDatasets] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [sectionsRes, radiometricRes] = await Promise.all([
          fetch("/data/stratigraphic_sections.csv"),
          fetch("/data/radiometric_data.csv"),
        ]);

        const [sectionsText, radiometricText] = await Promise.all([
          sectionsRes.text(),
          radiometricRes.text(),
        ]);

        const parsedSections = Papa.parse<StratigraphicSection>(sectionsText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });

        const parsedRadiometric = Papa.parse<RadiometricData>(radiometricText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });

        // Combine the data
        const combined: CombinedData[] = parsedRadiometric.data.map((rad) => {
          const section = parsedSections.data.find((sec) => sec.id === rad.sectionId);
          return {
            id: rad.id,
            name: section?.name || "Unknown",
            terrane: section?.terrane || "Unknown",
            ageMa: `${rad.ageMa} ± ${rad.errorMa}`,
            isotopeSystem: rad.isotopeSystem,
            reference: rad.reference,
            doi: rad.doi,
          };
        });

        setCombinedData(combined);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const downloadCSV = (filename: string, path: string) => {
    const link = document.createElement('a');
    link.href = path;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const datasets = [
    {
      name: "Current Dataset (v1.0)",
      date: "2025-01-15",
      sections: "/data/stratigraphic_sections.csv",
      radiometric: "/data/radiometric_data.csv",
      isCurrent: true,
    },
  ];

  return (
    <div className="py-12 bg-gradient-subtle">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold mb-4">
            Stratigraphic Data Portal
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Browse, search, and export radiometrically dated stratigraphic sections.
            All data sourced from peer-reviewed publications with DOI links.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-copper">{combinedData.length}</CardTitle>
              <CardDescription>Total Samples</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-copper">
                {new Set(combinedData.map(d => d.reference)).size}
              </CardTitle>
              <CardDescription>Published References</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-copper">
                {new Set(combinedData.map(d => d.isotopeSystem)).size}
              </CardTitle>
              <CardDescription>Isotope Systems</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card className="shadow-elegant mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-copper" />
                  Available Datasets
                </CardTitle>
                <CardDescription>
                  Download current and archived versions of the database
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDatasets(!showDatasets)}
              >
                {showDatasets ? "Hide" : "Show"} Datasets
              </Button>
            </div>
          </CardHeader>
          {showDatasets && (
            <CardContent className="space-y-4">
              {datasets.map((dataset, index) => (
                <div key={index} className="p-4 rounded-lg border bg-muted/30">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold flex items-center gap-2">
                        {dataset.name}
                        {dataset.isCurrent && (
                          <Badge variant="default" className="bg-copper">Current</Badge>
                        )}
                      </h4>
                      <p className="text-sm text-muted-foreground">Last updated: {dataset.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      variant="scientific" 
                      size="sm"
                      onClick={() => downloadCSV('stratigraphic_sections.csv', dataset.sections)}
                    >
                      <Download className="w-4 h-4" />
                      Stratigraphic Sections
                    </Button>
                    <Button 
                      variant="scientific" 
                      size="sm"
                      onClick={() => downloadCSV('radiometric_data.csv', dataset.radiometric)}
                    >
                      <Download className="w-4 h-4" />
                      Radiometric Data
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          )}
        </Card>

        <Card className="shadow-elegant mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Data Preview</CardTitle>
                <CardDescription>
                  Sample dataset - full compilation in development
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center text-muted-foreground py-8">Loading data...</p>
            ) : (
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Section Name</TableHead>
                      <TableHead>Terrane</TableHead>
                      <TableHead>Age (Ma)</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Reference</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {combinedData.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell className="font-mono text-xs">{row.id}</TableCell>
                        <TableCell className="font-medium">{row.name}</TableCell>
                        <TableCell>{row.terrane}</TableCell>
                        <TableCell className="font-mono">{row.ageMa}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{row.isotopeSystem}</Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          <a
                            href={`https://doi.org/${row.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-copper hover:underline flex items-center gap-1"
                          >
                            {row.reference}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataPortal;