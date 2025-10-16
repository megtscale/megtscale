import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Map, Clock, Database, Upload, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/ediacaran-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-copper/20 backdrop-blur-sm border border-copper/30 rounded-full">
            <span className="text-copper-foreground font-mono text-sm font-semibold">
              635 – 538 Million Years Ago
            </span>
          </div>

          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 text-primary-foreground">
            MEGTScale
            <br />
            <span className="text-copper">Middle East Geologic Time Scale</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-4xl mx-auto mb-8 leading-relaxed">
            During the Ediacaran Period (635–538 million years ago), the Arabian Plate was
            assembled in its present-day shape between several tectonic terranes. To reconstruct
            how it was assembled in space and time, we have built this interactive website to
            compile tectono-stratigraphic data with a view to building a chronostratigraphic chart
            of the Middle East.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/map">
              <Button variant="hero" size="xl">
                <Map className="w-5 h-5" />
                Explore the Map
              </Button>
            </Link>
            <Link to="/data">
              <Button variant="scientific" size="xl">
                <Database className="w-5 h-5" />
                View Data
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <Card className="shadow-elegant border-2">
            <CardContent className="p-8 md:p-12">
              <p className="text-lg md:text-xl text-foreground leading-relaxed">
                The data will include radiometrically dated stratigraphic sections, geological
                maps, and geophysical images including seismic sections from published articles and
                open-file reports. <strong>Geoscientists are welcome to view and comment on the
                data, and to contribute additional data</strong> to augment the compilation and
                improve the accuracy of the chart.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl font-bold mb-4">
              Explore the Platform
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Access comprehensive geological data, interactive visualizations, and collaborative tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/map">
              <Card className="h-full hover:shadow-elegant transition-smooth cursor-pointer group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                    <Map className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Interactive Map</CardTitle>
                  <CardDescription>
                    Explore radiometrically dated stratigraphic sections across the Middle East
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/timeline">
              <Card className="h-full hover:shadow-elegant transition-smooth cursor-pointer group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Time Scale Explorer</CardTitle>
                  <CardDescription>
                    Navigate through 97 million years of Ediacaran geological history
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/data">
              <Card className="h-full hover:shadow-elegant transition-smooth cursor-pointer group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Data Portal</CardTitle>
                  <CardDescription>
                    Search, filter, and export stratigraphic and radiometric datasets
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/contribute">
              <Card className="h-full hover:shadow-elegant transition-smooth cursor-pointer group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Contribute Data</CardTitle>
                  <CardDescription>
                    Upload your research using simple CSV templates
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Card className="h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-basalt flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-basalt-foreground" />
                </div>
                <CardTitle>Open Science</CardTitle>
                <CardDescription>
                  All data is open-access and citable with DOI references
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-basalt flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-basalt-foreground" />
                </div>
                <CardTitle>Collaborative</CardTitle>
                <CardDescription>
                  Built by the geoscience community, for the community
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl font-bold mb-6">
            Join the Research Community
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Your contributions help build a more accurate understanding of Middle Eastern geology
          </p>
          <Link to="/contribute">
            <Button variant="hero" size="xl">
              <Upload className="w-5 h-5" />
              Start Contributing
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
