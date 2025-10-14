import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

const DataPortal = () => {
  const sampleData = [
    {
      id: "sec-om-001",
      name: "Jabal Example Section",
      terrane: "Oman Ophiolite margin",
      ageMa: "602.4 ± 1.8",
      isotopeSystem: "U-Pb",
      reference: "Author et al. (2019)",
    },
    {
      id: "sec-uae-001",
      name: "UAE Outcrop",
      terrane: "Arabian Shield",
      ageMa: "580 ± 3.0",
      isotopeSystem: "Rb-Sr",
      reference: "Smith et al. (2020)",
    },
    {
      id: "sec-bh-001",
      name: "Bahrain Site",
      terrane: "Foreland Basin",
      ageMa: "565 ± 2.5",
      isotopeSystem: "U-Pb",
      reference: "Jones et al. (2021)",
    },
  ];

  return (
    <div className="min-h-screen py-12 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold mb-4">
            Stratigraphic Data Portal
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Browse, search, and export radiometrically dated stratigraphic sections.
            All data sourced from peer-reviewed publications and open-file reports.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-copper">3</CardTitle>
              <CardDescription>Total Sections</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-copper">3</CardTitle>
              <CardDescription>Published References</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-copper">2</CardTitle>
              <CardDescription>Isotope Systems</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card className="shadow-elegant mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Radiometric Age Database</CardTitle>
                <CardDescription>
                  Sample dataset - full compilation in development
                </CardDescription>
              </div>
              <Button variant="scientific" size="sm">
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent>
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
                  {sampleData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-mono text-xs">{row.id}</TableCell>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell>{row.terrane}</TableCell>
                      <TableCell className="font-mono">{row.ageMa}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{row.isotopeSystem}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {row.reference}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-copper" />
              Data Standards
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">CSV Format</h4>
              <p className="text-sm text-muted-foreground">
                All data is stored in UTF-8 encoded CSV files with standardized column headers.
                Download the template from the Contribute page to ensure compatibility.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Age Uncertainties</h4>
              <p className="text-sm text-muted-foreground">
                All radiometric ages include 2σ uncertainties. Ages are reported in millions of
                years (Ma) before present.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">References</h4>
              <p className="text-sm text-muted-foreground">
                Each entry links to the original publication via DOI when available. All data
                is citable and traceable to primary sources.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataPortal;
