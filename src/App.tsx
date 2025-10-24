import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
              <Route path="/" element={<MapView />} />
              <Route path="/timeline" element={<TimelineView />} />
              <Route path="/data" element={<DataPortal />} />
              <Route path="/contribute" element={<Contribute />} />
              <Route path="/about" element={<About />} />
              <Route path="/docs/radiometric-dating-guide" element={<DocumentationView />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
