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
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50 shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-copper via-primary to-secondary flex items-center justify-center shadow-elegant transition-transform group-hover:scale-105">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <div className="hidden md:block">
              <span className="font-heading font-bold text-xl text-foreground block leading-tight">
                MEGTScale
              </span>
              <span className="text-xs text-muted-foreground">
                Middle East Geologic Time Scale
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  size="default"
                  className={`gap-2 px-4 transition-all ${
                    isActive(item.path) 
                      ? "bg-gradient-to-r from-copper to-primary text-white shadow-md" 
                      : "hover:bg-accent"
                  }`}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  <span className="font-medium">{item.label}</span>
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-6 space-y-2 border-t border-border/50 animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block"
              >
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  size="lg"
                  className={`w-full justify-start gap-3 ${
                    isActive(item.path) 
                      ? "bg-gradient-to-r from-copper to-primary text-white shadow-md" 
                      : ""
                  }`}
                >
                  {item.icon && <item.icon className="w-5 h-5" />}
                  <span className="font-medium">{item.label}</span>
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
