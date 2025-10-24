import { Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
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
