import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Upload, FileText, CheckCircle, Map, Layers } from "lucide-react";
import { Link } from "react-router-dom";

const Contribute = () => {
  const downloadTemplate = (filename: string) => {
    const link = document.createElement('a');
    link.href = `/data/templates/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold mb-4">
            Contribute to the Database
          </h1>
          <p className="text-lg text-muted-foreground">
            Help build the most comprehensive chronostratigraphic chart of the Middle East.
            Your contributions strengthen the scientific foundation of this open-access resource.
          </p>
        </div>

        <Card className="shadow-elegant mb-8 gradient-accent text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="w-6 h-6" />
              How Stratigraphic Sections Are Used
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <Map className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Interactive Map Display</h4>
                <p className="text-sm opacity-90">
                  Each stratigraphic section appears as a georeferenced point on the interactive map,
                  allowing users to explore spatial distributions of rocks across the region.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Layers className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Stratigraphic Visualization</h4>
                <p className="text-sm opacity-90">
                  Sections are visualized with their lithologic units, age constraints, and radiometric data.
                  Users can compare multiple sections to understand regional stratigraphic relationships
                  and construct chronostratigraphic frameworks.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Data Integration</h4>
                <p className="text-sm opacity-90">
                  Your stratigraphic sections are linked to radiometric ages, rock types, and terranes,
                  creating a comprehensive database that researchers can query, filter, and export for
                  their own analyses.
                </p>
              </div>
            </div>

            <Link to="/">
              <Button variant="scientific" size="sm" className="mt-2">
                View Sections on Map →
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="shadow-elegant mb-8">
          <CardHeader>
            <CardTitle>How to Contribute</CardTitle>
            <CardDescription>
              A simple three-step process designed for geoscientists
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">Download CSV Template</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Use our standardized templates to ensure data compatibility. Templates include
                  detailed column descriptions and example entries.
                </p>
                <div className="flex gap-3">
                  <Button 
                    variant="scientific" 
                    size="sm"
                    onClick={() => downloadTemplate('stratigraphic_sections_template.csv')}
                  >
                    <Download className="w-4 h-4" />
                    Stratigraphic Sections
                  </Button>
                  <Button 
                    variant="scientific" 
                    size="sm"
                    onClick={() => downloadTemplate('radiometric_data_template.csv')}
                  >
                    <Download className="w-4 h-4" />
                    Radiometric Data
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center text-white font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">Fill in Your Data</h3>
                <p className="text-sm text-muted-foreground">
                  Add your stratigraphic sections, radiometric ages, location data, and references.
                  Use any spreadsheet software (Excel, Google Sheets, LibreOffice).
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center text-white font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">Upload or Submit</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Upload your completed CSV file using the form below. We'll review and integrate
                  your data into the database with full attribution.
                </p>
                <Button variant="hero" size="sm">
                  <Upload className="w-4 h-4" />
                  Upload CSV File
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Data Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-copper mt-0.5 flex-shrink-0" />
                  <span>Published or submitted research only</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-copper mt-0.5 flex-shrink-0" />
                  <span>Include DOI or citation information</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-copper mt-0.5 flex-shrink-0" />
                  <span>Radiometric ages with uncertainties</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-copper mt-0.5 flex-shrink-0" />
                  <span>GPS coordinates (decimal degrees)</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What Happens Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-copper mt-0.5 flex-shrink-0" />
                  <span>Data reviewed for quality and completeness</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-copper mt-0.5 flex-shrink-0" />
                  <span>Integrated into public database</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-copper mt-0.5 flex-shrink-0" />
                  <span>Full attribution to contributors</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-copper mt-0.5 flex-shrink-0" />
                  <span>Visible on map and data portal</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-6 h-6" />
              Data Entry Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Our comprehensive documentation provides detailed guidance on:
            </p>
            <ul className="space-y-2 text-sm mb-4">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-copper mt-0.5 flex-shrink-0" />
                <span>CSV template structure and required fields</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-copper mt-0.5 flex-shrink-0" />
                <span>Data formatting standards and conventions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-copper mt-0.5 flex-shrink-0" />
                <span>How to properly cite and reference your data sources</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-copper mt-0.5 flex-shrink-0" />
                <span>Quality control procedures and best practices</span>
              </li>
            </ul>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="scientific" size="sm">
                View Documentation Guide
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contribute;