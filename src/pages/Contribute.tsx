import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Download, Mail, FileText, CheckCircle, Map, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contribute = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institution: "",
    description: "",
  });

  const downloadTemplate = (filename: string) => {
    const link = document.createElement('a');
    link.href = `/data/templates/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const subject = encodeURIComponent("MEGTScale Data Contribution");
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Institution: ${formData.institution}\n\n` +
      `Description:\n${formData.description}\n\n` +
      `---\n` +
      `Please attach your CSV files to this email.`
    );
    
    window.location.href = `mailto:contact@megtscale.com?subject=${subject}&body=${body}`;
    
    toast({
      title: "Opening Email Client",
      description: "Your default email application will open with the form data.",
    });
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
            <div className="flex gap-3 md:gap-4">
              <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-accent flex items-center justify-center text-white font-bold text-sm md:text-base">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base md:text-lg mb-2">Download CSV Template</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-3">
                  Use our standardized templates to ensure data compatibility. Templates include
                  detailed column descriptions and example entries.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Button 
                    variant="scientific" 
                    size="sm"
                    onClick={() => downloadTemplate('stratigraphic_sections_template.csv')}
                    className="w-full sm:w-auto justify-center sm:justify-start"
                  >
                    <Download className="w-4 h-4" />
                    Stratigraphic Sections
                  </Button>
                  <Button 
                    variant="scientific" 
                    size="sm"
                    onClick={() => downloadTemplate('radiometric_data_template.csv')}
                    className="w-full sm:w-auto justify-center sm:justify-start"
                  >
                    <Download className="w-4 h-4" />
                    Radiometric Data
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 md:gap-4">
              <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-accent flex items-center justify-center text-white font-bold text-sm md:text-base">
                2
              </div>
              <div className="flex-1">
<h3 className="font-semibold text-base md:text-lg mb-2">Fill in Your Data</h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Add your stratigraphic sections, radiometric ages, location data, and references.
                  Use any spreadsheet software (Excel, Google Sheets, LibreOffice).
                </p>
              </div>
            </div>

            <div className="flex gap-3 md:gap-4">
              <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-accent flex items-center justify-center text-white font-bold text-sm md:text-base">
                3
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base md:text-lg mb-2">Submit Your Data</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-3">
                  Fill in the form below and submit your data via email. We'll review and integrate
                  your data into the database with full attribution.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-6 h-6 text-copper" />
              Submit Your Data
            </CardTitle>
            <CardDescription>
              Fill in the form below to submit your data contribution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@institution.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="institution">Institution / Organization</Label>
                <Input
                  id="institution"
                  placeholder="University or research institution"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Data Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the data you're contributing (e.g., number of stratigraphic sections, radiometric ages, study area, publication status)"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={5}
                  required
                />
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> When you click "Send Email", your default email client will open 
                  with the form data. Please attach your completed CSV files before sending the email.
                </p>
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full">
                <Mail className="w-4 h-4" />
                Send Email to contact@megtscale.com
              </Button>
            </form>
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
              <CheckCircle className="w-6 h-6 text-copper" />
              Data Standards & Best Practices
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-copper" />
                CSV Format Standards
              </h4>
              <p className="text-sm text-muted-foreground">
                All data is stored in UTF-8 encoded CSV files with standardized column headers.
                Download the template above to ensure compatibility with the database structure.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Age Uncertainty Reporting</h4>
              <p className="text-sm text-muted-foreground">
                All radiometric ages must include 2σ (95% confidence) uncertainties. Ages are reported 
                in millions of years (Ma) before present. Both analytical and systematic uncertainties 
                should be included when relevant.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Multiple Dataset Support</h4>
              <p className="text-sm text-muted-foreground">
                The MEGTScale portal is designed to accommodate multiple datasets from various contributors.
                Each dataset maintains its own CSV file with proper attribution and DOI links.
                As more data is contributed, additional tables and visualizations will be generated
                automatically to compare and analyze different studies.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">References with DOI Links</h4>
              <p className="text-sm text-muted-foreground">
                Each entry must link directly to the original publication via DOI. All data
                is citable and traceable to primary sources, ensuring scientific integrity
                and enabling proper attribution. Use the format: "Author et al. (Year)" in the reference field.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contribute;