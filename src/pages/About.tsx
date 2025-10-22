import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Target, Users, Mail, FileText, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen py-12 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold mb-4">
            About the Project
          </h1>
          <p className="text-lg text-muted-foreground">
            Building an open-access chronostratigraphic framework for the Middle East
          </p>
        </div>

        <Card className="shadow-elegant mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-6 h-6 text-copper" />
              Project Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p className="text-foreground">
              The Middle East Geological Time Scale project aims to create the most comprehensive
              and accurate chronostratigraphic chart of the geological Periods in the
              Middle East. By compiling radiometric ages, stratigraphic data, and tectonic
              interpretations from across the region, we seek to understand how the Arabian Plate
              was assembled from multiple terranes during this critical period in Earth history.
            </p>
            <p className="text-foreground mt-4">
              This open-access platform enables the global geoscience community to view, analyze,
              and contribute data, fostering collaboration and accelerating scientific discovery.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-copper" />
                Scientific Background
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground mb-3">
                The Arabian Plate geology represents a major transition in Earth's history, marking the
                emergence of complex life and significant tectonic reorganization.
              </p>
              <p className="text-sm text-foreground">
                Understanding the precise timing and spatial relationships of tectonic events
                requires integrating diverse datasets including radiometric ages, stratigraphic
                correlations, and geophysical observations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-copper" />
                Open Science Approach
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground mb-3">
                All data in this platform is freely accessible and citable. We believe that
                open access to geological data accelerates research and benefits the entire
                scientific community.
              </p>
              <p className="text-sm text-foreground">
                Contributors receive full attribution, and all datasets link to original
                publications via DOI references.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Methodology</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Data Compilation</h4>
              <p className="text-sm text-muted-foreground">
                Stratigraphic sections, radiometric ages, and geophysical data are compiled from
                peer-reviewed publications and open-file reports. Each entry includes complete
                metadata and references to original sources.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Quality Control</h4>
              <p className="text-sm text-muted-foreground">
                All submitted data undergoes review for completeness, accuracy, and proper
                citation. Analytical uncertainties and methodological details are preserved.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Chronostratigraphic Correlation</h4>
              <p className="text-sm text-muted-foreground">
                Radiometric ages are used to correlate stratigraphic sections across tectonic
                terranes, building a coherent temporal framework for the entire region.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-6 h-6" />
              Radiometric Rock Dating Information
            </CardTitle>
            <CardDescription>
              Comprehensive guide to isotope systems, laboratory methods, and best practices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Our detailed documentation covers everything you need to know about radiometric dating:
            </p>
            <ul className="space-y-2 text-sm mb-4">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-copper mt-0.5 flex-shrink-0" />
                <span><strong>Isotope Systems:</strong> U-Pb, Rb-Sr, Ar-Ar, Sm-Nd - their applications and limitations</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-copper mt-0.5 flex-shrink-0" />
                <span><strong>Laboratory Methods:</strong> LA-ICP-MS, SHRIMP, TIMS techniques and best practices</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-copper mt-0.5 flex-shrink-0" />
                <span><strong>Data Standards:</strong> How to properly report ages, uncertainties, and metadata</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-copper mt-0.5 flex-shrink-0" />
                <span><strong>Common Issues:</strong> Pb loss, Ar excess, inherited zircons, and alteration effects</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-copper mt-0.5 flex-shrink-0" />
                <span><strong>Regional Applications:</strong> Middle East geology-specific considerations</span>
              </li>
            </ul>
            <Link to="/docs/radiometric-dating-guide">
              <Button variant="scientific" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Read Full Documentation
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-6 h-6 text-copper" />
              Contact & Collaboration
            </CardTitle>
            <CardDescription>
              Get in touch with the project team
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-foreground">
              We welcome collaboration, feedback, and data contributions from the geoscience
              community. Whether you have questions about the data, suggestions for improvement,
              or would like to contribute your research, please reach out.
            </p>
            <Button variant="hero">
              <Mail className="w-4 h-4" />
              Contact Us
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default About;
