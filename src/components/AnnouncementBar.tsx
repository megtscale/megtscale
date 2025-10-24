import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Announcement {
  enabled: boolean;
  message: string;
  link?: string;
  linkText?: string;
}

const AnnouncementBar = () => {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const loadAnnouncement = async () => {
      try {
        const response = await fetch("/data/announcement.json");
        const data: Announcement = await response.json();
        
        if (data.enabled) {
          const isClosed = localStorage.getItem("announcement-closed") === "true";
          if (!isClosed) {
            setAnnouncement(data);
            setIsVisible(true);
          }
        }
      } catch (error) {
        console.error("Error loading announcement:", error);
      }
    };

    loadAnnouncement();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("announcement-closed", "true");
  };

  if (!isVisible || !announcement) {
    return null;
  }

  return (
    <div className="bg-red-600 text-white py-3 px-4 relative">
      <div className="container mx-auto flex items-center justify-center gap-4">
        <p className="text-sm md:text-base text-center flex-1">
          {announcement.message}
          {announcement.link && announcement.linkText && (
            announcement.link.startsWith('/') ? (
              <Link
                to={announcement.link}
                className="ml-2 underline font-semibold hover:opacity-80 transition-smooth"
              >
                {announcement.linkText}
              </Link>
            ) : (
              <a
                href={announcement.link}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 underline font-semibold hover:opacity-80 transition-smooth"
              >
                {announcement.linkText}
              </a>
            )
          )}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default AnnouncementBar;
