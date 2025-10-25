import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const DocumentationView = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/docs/radiometric-dating-guide.md")
      .then((res) => res.text())
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading documentation:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen py-12 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <Card>
            <CardContent className="p-8">
              <p className="text-center text-muted-foreground">Loading documentation...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <Link to="/data">
          <Button variant="outline" size="sm" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Data Portal
          </Button>
        </Link>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-3xl">
              <FileText className="w-8 h-8 text-copper" />
              Radiometric Dating Guide
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none p-8">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold mt-8 mb-4 text-foreground">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold mt-6 mb-3 text-foreground">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold mt-4 mb-2 text-foreground">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="mb-4 text-foreground leading-relaxed">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="text-foreground">{children}</li>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-copper">{children}</strong>
                ),
                code: ({ children }) => (
                  <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
                    {children}
                  </code>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentationView;
