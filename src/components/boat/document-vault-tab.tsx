"use client";

import { useState } from "react";
import { FileText, Upload, Download, Trash2, Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { DOCUMENT_TYPES } from "@/lib/constants";

interface Document {
  id: string;
  name: string;
  type: string;
  fileUrl: string;
  fileSize: number | null;
  mimeType: string | null;
  expiresAt: string | null;
  createdAt: string;
}

const typeColors: Record<string, "ocean" | "teal" | "gold" | "secondary" | "danger"> = {
  REGISTRATION: "ocean",
  INSURANCE: "teal",
  SURVEY: "gold",
  SERVICE_RECORD: "secondary",
  MANUAL: "secondary",
  CERTIFICATE: "teal",
  OTHER: "secondary",
};

function formatFileSize(bytes: number | null): string {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function DocumentVaultTab({
  documents,
  boatId,
}: {
  documents: Document[];
  boatId: string;
}) {
  const [filter, setFilter] = useState<string>("ALL");
  void boatId;

  const filtered =
    filter === "ALL"
      ? documents
      : documents.filter((d) => d.type === filter);

  const isExpiringSoon = (expiresAt: string | null) => {
    if (!expiresAt) return false;
    const days = (new Date(expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return days > 0 && days < 30;
  };

  const isExpired = (expiresAt: string | null) => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter("ALL")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === "ALL"
                ? "bg-navy text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All ({documents.length})
          </button>
          {DOCUMENT_TYPES.map((type) => {
            const count = documents.filter((d) => d.type === type.id).length;
            if (count === 0) return null;
            return (
              <button
                key={type.id}
                onClick={() => setFilter(type.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  filter === type.id
                    ? "bg-navy text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {type.label} ({count})
              </button>
            );
          })}
        </div>
        <Button variant="ocean" size="sm">
          <Upload className="w-4 h-4" />
          Upload Document
        </Button>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <FileText className="w-12 h-12 text-slate-200 mb-4" />
          <h3 className="font-heading font-semibold text-navy mb-2">No documents</h3>
          <p className="text-slate-500 text-sm mb-6">
            Upload registrations, insurance policies, surveys, and more
          </p>
          <Button variant="ocean" size="sm">
            <Plus className="w-4 h-4" />
            Upload First Document
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((doc) => (
            <div
              key={doc.id}
              className="group relative bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-card-hover transition-all duration-200"
            >
              {/* Expiry warning */}
              {isExpired(doc.expiresAt) && (
                <div className="absolute top-3 right-3">
                  <Badge variant="danger">Expired</Badge>
                </div>
              )}
              {isExpiringSoon(doc.expiresAt) && !isExpired(doc.expiresAt) && (
                <div className="absolute top-3 right-3">
                  <Badge variant="warning">Expiring Soon</Badge>
                </div>
              )}

              <div className="flex items-start gap-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-ocean/10 flex-shrink-0">
                  <FileText className="w-5 h-5 text-ocean" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-navy text-sm truncate">
                    {doc.name}
                  </p>
                  <Badge
                    variant={typeColors[doc.type] ?? "secondary"}
                    className="mt-1 text-xs"
                  >
                    {DOCUMENT_TYPES.find((t) => t.id === doc.type)?.label ?? doc.type}
                  </Badge>
                </div>
              </div>

              <div className="space-y-1 text-xs text-slate-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Uploaded {formatDate(doc.createdAt)}
                </div>
                {doc.expiresAt && (
                  <div
                    className={`flex items-center gap-1 ${
                      isExpired(doc.expiresAt)
                        ? "text-red-500"
                        : isExpiringSoon(doc.expiresAt)
                          ? "text-amber-500"
                          : ""
                    }`}
                  >
                    <Calendar className="w-3 h-3" />
                    Expires {formatDate(doc.expiresAt)}
                  </div>
                )}
                {doc.fileSize && (
                  <span>{formatFileSize(doc.fileSize)}</span>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="outline" size="sm" className="flex-1 text-xs">
                  <Download className="w-3 h-3" />
                  Download
                </Button>
                <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-500 hover:bg-red-50 h-8 w-8">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
