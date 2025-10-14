import { Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading font-bold text-lg mb-3">
              Middle East Geological Time Scale
            </h3>
            <p className="text-sm text-primary-foreground/80">
              An open-access platform for exploring and contributing to the
              chronostratigraphic understanding of the Ediacaran Period in the Middle East.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/map" className="hover:text-copper transition-smooth">
                  Interactive Map
                </a>
              </li>
              <li>
                <a href="/timeline" className="hover:text-copper transition-smooth">
                  Time Scale Explorer
                </a>
              </li>
              <li>
                <a href="/data" className="hover:text-copper transition-smooth">
                  Data Portal
                </a>
              </li>
              <li>
                <a href="/contribute" className="hover:text-copper transition-smooth">
                  Contribute Data
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-3">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-copper transition-smooth"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@example.com"
                className="hover:text-copper transition-smooth"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm mt-4 text-primary-foreground/80">
              © {new Date().getFullYear()} Middle East Geological Time Scale Project
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
