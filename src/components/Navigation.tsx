import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Map, Clock, Database, Upload, Info, Menu, X } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home", icon: null },
    { path: "/map", label: "Interactive Map", icon: Map },
    { path: "/timeline", label: "Time Scale", icon: Clock },
    { path: "/data", label: "Data Portal", icon: Database },
    { path: "/contribute", label: "Contribute", icon: Upload },
    { path: "/about", label: "About", icon: Info },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center shadow-card">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <div className="hidden md:block">
              <span className="font-heading font-bold text-lg text-foreground">
                Middle East
              </span>
              <span className="block text-xs text-muted-foreground">
                Geological Time Scale
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "scientific" : "ghost"}
                  size="sm"
                  className="gap-2"
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-2 border-t border-border">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block"
              >
                <Button
                  variant={isActive(item.path) ? "scientific" : "ghost"}
                  size="sm"
                  className="w-full justify-start gap-2"
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
