"use client";

import { useState, useCallback } from "react";
import {
  Upload,
  FileText,
  CheckCircle2,
  Clock,
  Trash2,
  Eye,
  Plus,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { mockDocuments } from "@/lib/mock-data";

type DocStatus = "uploading" | "parsing" | "parsed" | "error";

type Document = {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  status: DocStatus;
  data?: Record<string, unknown>;
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

function StatusBadge({ status }: { status: DocStatus }) {
  switch (status) {
    case "uploading":
      return (
        <Badge variant="secondary" className="gap-1">
          <Loader2 className="h-3 w-3 animate-spin" />
          Uploading
        </Badge>
      );
    case "parsing":
      return (
        <Badge variant="secondary" className="gap-1 bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
          <Clock className="h-3 w-3" />
          Parsing
        </Badge>
      );
    case "parsed":
      return (
        <Badge className="gap-1 bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-400">
          <CheckCircle2 className="h-3 w-3" />
          Parsed
        </Badge>
      );
    default:
      return <Badge variant="destructive">Error</Badge>;
  }
}

export default function UploadPage() {
  const [documents, setDocuments] = useState<Document[]>(
    mockDocuments as unknown as Document[]
  );
  const [isDragging, setIsDragging] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  const simulateUpload = useCallback(
    (fileName: string) => {
      const newDoc: Document = {
        id: `doc-${Date.now()}`,
        name: fileName,
        type: fileName.includes("W-2")
          ? "W-2"
          : fileName.includes("1099")
            ? "1099"
            : "Other",
        uploadedAt: new Date().toISOString().split("T")[0],
        status: "uploading",
      };

      setDocuments((prev) => [newDoc, ...prev]);

      setTimeout(() => {
        setDocuments((prev) =>
          prev.map((d) =>
            d.id === newDoc.id ? { ...d, status: "parsing" as DocStatus } : d
          )
        );
      }, 1000);

      setTimeout(() => {
        setDocuments((prev) =>
          prev.map((d) =>
            d.id === newDoc.id
              ? {
                  ...d,
                  status: "parsed" as DocStatus,
                  data: {
                    employer: "Simulated Employer",
                    wages: 75000,
                    federalWithheld: 15000,
                    stateWithheld: 5800,
                  },
                }
              : d
          )
        );
      }, 3000);
    },
    []
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const files = Array.from(e.dataTransfer.files);
      files.forEach((f) => simulateUpload(f.name));
    },
    [simulateUpload]
  );

  const handleFileSelect = useCallback(
    () => {
      const sampleNames = [
        "W-2_NewEmployer_2025.pdf",
        "1099-MISC_Client_2025.pdf",
        "1099-B_Brokerage_2025.pdf",
      ];
      const randomName =
        sampleNames[Math.floor(Math.random() * sampleNames.length)];
      simulateUpload(randomName);
    },
    [simulateUpload]
  );

  const removeDoc = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Document Upload</h1>
        <p className="text-muted-foreground mt-1">
          Upload your W-2s, 1099s, and other tax documents. Our AI will
          automatically extract the key fields.
        </p>
      </div>

      {/* Upload Area */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              isDragging
                ? "border-[#38a169] bg-[#38a169]/5 dark:border-[#48bb78] dark:bg-[#48bb78]/5"
                : "border-muted-foreground/25 hover:border-muted-foreground/50"
            }`}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">
              Drop your tax documents here
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Supports PDF files — W-2, 1099-NEC, 1099-INT, 1099-DIV,
              1099-MISC, 1099-B, and more
            </p>
            <Button onClick={handleFileSelect} className="bg-[#38a169] hover:bg-[#2f855a] text-white">
              <Plus className="mr-2 h-4 w-4" />
              Select Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Document List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            <span>Uploaded Documents ({documents.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {documents.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No documents uploaded yet</p>
              <p className="text-sm">
                Upload your first tax document to get started
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-[#1a365d]/10 dark:bg-[#60a5fa]/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-[#1a365d] dark:text-[#60a5fa]" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{doc.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {doc.type} &middot; Uploaded {doc.uploadedAt}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={doc.status} />
                    {doc.status === "parsed" && doc.data && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedDoc(doc)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Parsed Data: {doc.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-3">
                            {Object.entries(doc.data).map(([key, value]) => (
                              <div
                                key={key}
                                className="flex justify-between py-2 border-b last:border-0"
                              >
                                <span className="text-sm text-muted-foreground capitalize">
                                  {key.replace(/([A-Z])/g, " $1").trim()}
                                </span>
                                <span className="text-sm font-medium">
                                  {typeof value === "number"
                                    ? formatCurrency(value)
                                    : String(value)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeDoc(doc.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
