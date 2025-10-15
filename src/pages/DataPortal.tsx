import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, ExternalLink } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const DataPortal = () => {
  const sampleData = [
    {
      id: "sec-om-001",
      name: "Jabal Example Section",
      terrane: "Oman Ophiolite margin",
      ageMa: "602.4 ± 1.8",
      isotopeSystem: "U-Pb",
      reference: "Author et al. (2019)",
      doi: "10.5678/example.doi",
    },
    {
      id: "sec-uae-001",
      name: "UAE Outcrop",
      terrane: "Arabian Shield",
      ageMa: "580 ± 3.0",
      isotopeSystem: "Rb-Sr",
      reference: "Smith et al. (2020)",
      doi: "10.1234/uae.doi",
    },
    {
      id: "sec-bh-001",
      name: "Bahrain Site",
      terrane: "Foreland Basin",
      ageMa: "565 ± 2.5",
      isotopeSystem: "U-Pb",
      reference: "Jones et al. (2021)",
      doi: "10.9876/bahrain.doi",
    },
  ];

  // Chart data
  const ageDistributionData = [
    { ageRange: "535-550 Ma", count: 1 },
    { ageRange: "550-570 Ma", count: 1 },
    { ageRange: "570-590 Ma", count: 0 },
    { ageRange: "590-610 Ma", count: 1 },
    { ageRange: "610-635 Ma", count: 0 },
  ];

  const isotopeSystemData = [
    { name: "U-Pb", value: 2, color: "#8B4513" },
    { name: "Rb-Sr", value: 1, color: "#CD853F" },
  ];

  const terraneData = [
    { terrane: "Oman Ophiolite", count: 1 },
    { terrane: "Arabian Shield", count: 1 },
    { terrane: "Foreland Basin", count: 1 },
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
            All data sourced from peer-reviewed publications with DOI links.
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

        <Tabs defaultValue="table" className="mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="table">Data Table</TabsTrigger>
            <TabsTrigger value="charts">Visualizations</TabsTrigger>
          </TabsList>

          <TabsContent value="table">
            <Card className="shadow-elegant">
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="charts">
            <div className="space-y-6">
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle>Age Distribution</CardTitle>
                  <CardDescription>Number of samples per age range</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={ageDistributionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="ageRange" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="hsl(var(--copper))" name="Sample Count" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle>Isotope Systems</CardTitle>
                    <CardDescription>Distribution by analytical method</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={isotopeSystemData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={(entry) => `${entry.name}: ${entry.value}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {isotopeSystemData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle>Terrane Distribution</CardTitle>
                    <CardDescription>Samples by geological terrane</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={terraneData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="terrane" type="category" width={100} />
                        <Tooltip />
                        <Bar dataKey="count" fill="hsl(var(--accent))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-copper" />
              Data Standards & Multiple Datasets
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
              <h4 className="font-semibold mb-2">Multiple Dataset Support</h4>
              <p className="text-sm text-muted-foreground">
                This portal is designed to accommodate multiple datasets from various contributors.
                Each dataset maintains its own CSV file with proper attribution and DOI links.
                As more data is contributed, additional tables and visualizations will be generated
                automatically to compare and analyze different studies.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">References with DOI Links</h4>
              <p className="text-sm text-muted-foreground">
                Each entry links directly to the original publication via DOI. All data
                is citable and traceable to primary sources, ensuring scientific integrity
                and enabling proper attribution.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataPortal;