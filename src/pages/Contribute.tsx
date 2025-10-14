import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Upload, FileText, CheckCircle } from "lucide-react";

const Contribute = () => {
  return (
    <div className="min-h-screen py-12 bg-gradient-subtle">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold mb-4">
            Contribute to the Database
          </h1>
          <p className="text-lg text-muted-foreground">
            Help build the most comprehensive chronostratigraphic chart of the Middle East.
            Your contributions strengthen the scientific foundation of this open-access resource.
          </p>
        </div>

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
                  <Button variant="scientific" size="sm">
                    <Download className="w-4 h-4" />
                    Stratigraphic Sections
                  </Button>
                  <Button variant="scientific" size="sm">
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

        <Card className="bg-gradient-accent text-white shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-6 h-6" />
              Guidelines & Documentation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 opacity-90">
              Detailed data entry guidelines, field definitions, and best practices are available
              in our comprehensive documentation.
            </p>
            <Button variant="scientific" size="sm">
              View Full Documentation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contribute;
