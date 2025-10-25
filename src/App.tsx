import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import MapView from "./pages/MapView";
import TimelineView from "./pages/TimelineView";
import DataPortal from "./pages/DataPortal";
import Contribute from "./pages/Contribute";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import DocumentationView from "./pages/DocumentationView";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import AnnouncementBar from "./components/AnnouncementBar";

const queryClient = new QueryClient();

// SEO Component for setting page metadata
const PageMeta = ({ title, description }: { title: string; description: string }) => {
  useEffect(() => {
    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }
  }, [title, description]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <AnnouncementBar />
          <Navigation />
          <main className="flex-1 px-4 md:px-8 lg:px-12">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <PageMeta
                      title="MEGTScale - Interactive Geological Map | Middle East Geologic Time Scale"
                      description="Explore radiometrically dated stratigraphic sections across the Middle East. Interactive map with comprehensive geological data from the Arabian Plate."
                    />
                    <MapView />
                  </>
                }
              />
              <Route
                path="/timeline"
                element={
                  <>
                    <PageMeta
                      title="Geologic Time Scale | MEGTScale"
                      description="Navigate through millions of years of Middle East geological history. View major tectonic, climatic, and biological events during Arabian Plate assembly."
                    />
                    <TimelineView />
                  </>
                }
              />
              <Route
                path="/data"
                element={
                  <>
                    <PageMeta
                      title="Data Portal | MEGTScale"
                      description="Search, filter, and export stratigraphic and radiometric datasets from the Middle East. Open-access geological data with DOI references."
                    />
                    <DataPortal />
                  </>
                }
              />
              <Route
                path="/contribute"
                element={
                  <>
                    <PageMeta
                      title="Contribute Data | MEGTScale"
                      description="Submit your geological research data to MEGTScale. Help build a comprehensive chronostratigraphic framework for the Middle East."
                    />
                    <Contribute />
                  </>
                }
              />
              <Route
                path="/about"
                element={
                  <>
                    <PageMeta
                      title="About | MEGTScale Project"
                      description="Learn about the Middle East Geologic Time Scale project. Open-access platform for chronostratigraphic research and collaboration."
                    />
                    <About />
                  </>
                }
              />
              <Route
                path="/docs/radiometric-dating-guide"
                element={
                  <>
                    <PageMeta
                      title="Radiometric Dating Guide | MEGTScale"
                      description="Comprehensive guide to radiometric dating methods, isotope systems, and laboratory techniques for Middle East geological research."
                    />
                    <DocumentationView />
                  </>
                }
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route
                path="*"
                element={
                  <>
                    <PageMeta
                      title="Page Not Found | MEGTScale"
                      description="The page you are looking for does not exist."
                    />
                    <NotFound />
                  </>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
