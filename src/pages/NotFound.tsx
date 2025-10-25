import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex items-center justify-center py-20 bg-gradient-subtle">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-copper">404</h1>
        <p className="mb-6 text-2xl text-foreground">Oops! Page not found</p>
        <p className="mb-8 text-muted-foreground">The page you're looking for doesn't exist.</p>
        <Link to="/" className="text-copper hover:text-copper/80 underline font-medium transition-smooth">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
