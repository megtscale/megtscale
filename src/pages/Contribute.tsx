import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Download, Mail, FileText, CheckCircle, Map, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Google Apps Script URL for form submission
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxt0djGiBcz3kiK74kIqcZWJSyngc6bjgc6A2ygj4FrKOV8XdR5gLogYn5wtS0p_UAYOQ/exec";

const Contribute = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institution: "",
    description: "",
  });
  const [files, setFiles] = useState<FileList | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const downloadTemplate = (filename: string) => {
    const link = document.createElement('a');
    link.href = `/data/templates/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.name || !formData.email || !formData.description) {
    toast({
      title: "Missing Information",
      description: "Please fill in all required fields.",
      variant: "destructive",
    });
    return;
  }

  setIsSubmitting(true);

  try {
    // ✅ Build a FormData payload
    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("institution", formData.institution);
    form.append("description", formData.description);

    if (files) {
      for (let i = 0; i < files.length; i++) {
        form.append("file", files[i]);
      }
    }

    // ✅ Send directly — no headers, no "no-cors"
    await fetch(GOOGLE_APPS_SCRIPT_URL + "?nocache=" + Date.now(), {
      method: "POST",
      body: form,
      redirect: "follow",
      mode: "cors",
    });

    toast({
      title: "Submission Sent",
      description: "Your data contribution has been submitted successfully.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      institution: "",
      description: "",
    });
    setFiles(null);

    const fileInput = document.getElementById("files") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  } catch (error) {
    console.error("Error submitting form:", error);
    toast({
      title: "Submission Error",
      description: "Failed to submit the form. Please try again or contact us directly.",
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="py-12 bg-gradient-subtle">
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
                  <Label htmlFor="name">Full Name *</Label>
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

              <div className="space-y-2">
                <Label htmlFor="files">Attach CSV Files</Label>
                <Input
                  id="files"
                  type="file"
                  accept=".csv"
                  multiple
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground">
                  You can attach multiple CSV files (stratigraphic sections, radiometric data, etc.)
                </p>
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full"
                disabled={isSubmitting}
              >
                <Mail className="w-4 h-4" />
                {isSubmitting ? "Submitting..." : "Submit Data Contribution"}
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