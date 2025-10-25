import { Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface Sponsor {
  id: string;
  name: string;
  logo: string;
  url: string;
  active: boolean;
}

const Footer = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSponsors = async () => {
      try {
        const response = await fetch("/data/sponsors.json");
        const data = await response.json();
        setSponsors(data.filter((sponsor: Sponsor) => sponsor.active));
      } catch (error) {
        console.error("Error loading sponsors:", error);
      } finally {
        setLoading(false);
      }
    };
    loadSponsors();
  }, []);

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Sponsor Banner Section - Hidden when no active sponsors */}
      {!loading && sponsors.length > 0 && (
        <div className="py-6 border-b border-primary-foreground/10">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <span className="text-sm font-semibold text-primary-foreground/60">
                Sponsored by:
              </span>
              <div className="flex items-center gap-6 flex-wrap justify-center">
                {sponsors.map((sponsor) => (
                  <a
                    key={sponsor.id}
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded px-4 py-2 hover:opacity-80 transition-smooth"
                    title={sponsor.name}
                  >
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="h-8 max-w-[150px] object-contain"
                      onError={(e) => {
                        // Fallback to text if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          const span = document.createElement('span');
                          span.className = 'text-primary-foreground/80 text-sm';
                          span.textContent = sponsor.name;
                          parent.appendChild(span);
                        }
                      }}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading font-bold text-lg mb-3">
              MEGTScale
            </h3>
            <p className="text-sm text-primary-foreground/80">
              Middle East Geologic Time Scale - An open-access platform for exploring and 
              contributing to the chronostratigraphic understanding of the region's geology.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-copper transition-smooth">
                  Interactive Map
                </Link>
              </li>
              <li>
                <Link to="/timeline" className="hover:text-copper transition-smooth">
                  Time Scale
                </Link>
              </li>
              <li>
                <Link to="/data" className="hover:text-copper transition-smooth">
                  Data Portal
                </Link>
              </li>
              <li>
                <Link to="/contribute" className="hover:text-copper transition-smooth">
                  Contribute Data
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-3">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/digitalgeosciences"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-copper transition-smooth"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:info@digitalgeosciences.com"
                className="hover:text-copper transition-smooth"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm mt-4 text-primary-foreground/80">
              Developed and maintained by{" "}
              <a 
                href="https://digitalgeosciences.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-copper transition-smooth underline"
              >
                Digital Geosciences
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
