"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Upload,
  Search,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Download,
  Trash2,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  boat: { name: string } | null;
}

const demoDocuments: Document[] = [
  { id: "d1", name: "Sea Breeze - USCG Documentation", type: "REGISTRATION", fileUrl: "#", fileSize: 1248000, mimeType: "application/pdf", expiresAt: new Date(Date.now() + 200 * 86400000).toISOString(), createdAt: new Date(Date.now() - 90 * 86400000).toISOString(), boat: { name: "Sea Breeze" } },
  { id: "d2", name: "Marine Insurance Policy 2025", type: "INSURANCE", fileUrl: "#", fileSize: 2560000, mimeType: "application/pdf", expiresAt: new Date(Date.now() + 25 * 86400000).toISOString(), createdAt: new Date(Date.now() - 300 * 86400000).toISOString(), boat: { name: "Sea Breeze" } },
  { id: "d3", name: "Pre-Purchase Survey Report", type: "SURVEY", fileUrl: "#", fileSize: 4200000, mimeType: "application/pdf", expiresAt: null, createdAt: new Date(Date.now() - 500 * 86400000).toISOString(), boat: { name: "Sea Breeze" } },
  { id: "d4", name: "Engine Service Record - Dec 2024", type: "SERVICE_RECORD", fileUrl: "#", fileSize: 890000, mimeType: "application/pdf", expiresAt: null, createdAt: new Date(Date.now() - 60 * 86400000).toISOString(), boat: { name: "Sea Breeze" } },
  { id: "d5", name: "Yanmar 4JH5E Owner Manual", type: "MANUAL", fileUrl: "#", fileSize: 15000000, mimeType: "application/pdf", expiresAt: null, createdAt: new Date(Date.now() - 180 * 86400000).toISOString(), boat: null },
  { id: "d6", name: "Fire Extinguisher Certificate", type: "CERTIFICATE", fileUrl: "#", fileSize: 340000, mimeType: "application/pdf", expiresAt: new Date(Date.now() - 5 * 86400000).toISOString(), createdAt: new Date(Date.now() - 400 * 86400000).toISOString(), boat: { name: "Blue Horizon" } },
  { id: "d7", name: "Blue Horizon Registration", type: "REGISTRATION", fileUrl: "#", fileSize: 980000, mimeType: "application/pdf", expiresAt: new Date(Date.now() + 100 * 86400000).toISOString(), createdAt: new Date(Date.now() - 120 * 86400000).toISOString(), boat: { name: "Blue Horizon" } },
];

function formatFileSize(bytes: number | null): string {
  if (!bytes) return "";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");

  useEffect(() => {
    fetch("/api/documents")
      .then((r) => r.json())
      .then((data) => {
        setDocuments(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const displayDocs = documents.length > 0 ? documents : demoDocuments;

  const filtered = displayDocs.filter((d) => {
    const matchSearch =
      !search || d.name.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "ALL" || d.type === typeFilter;
    return matchSearch && matchType;
  });

  const expiredCount = displayDocs.filter(
    (d) => d.expiresAt && new Date(d.expiresAt) < new Date()
  ).length;
  const expiringSoonCount = displayDocs.filter((d) => {
    if (!d.expiresAt) return false;
    const days = (new Date(d.expiresAt).getTime() - Date.now()) / 86400000;
    return days > 0 && days < 30;
  }).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-navy">
            Document Vault
          </h1>
          <p className="text-slate-500 mt-1">
            All vessel documents in one secure place
          </p>
        </div>
        <Button variant="ocean" size="md">
          <Upload className="w-4 h-4" />
          Upload Document
        </Button>
      </div>

      {/* Alert banners */}
      {(expiredCount > 0 || expiringSoonCount > 0) && (
        <div className="space-y-2">
          {expiredCount > 0 && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-700">
                <strong>{expiredCount} document{expiredCount > 1 ? "s have" : " has"} expired.</strong>{" "}
                Please renew them to stay compliant.
              </p>
            </div>
          )}
          {expiringSoonCount > 0 && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
              <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <p className="text-sm text-amber-700">
                <strong>{expiringSoonCount} document{expiringSoonCount > 1 ? "s are" : " is"} expiring within 30 days.</strong>{" "}
                Renew them before they lapse.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Documents", value: displayDocs.length, icon: FileText, color: "text-ocean bg-ocean/10" },
          { label: "Valid", value: displayDocs.filter((d) => !d.expiresAt || new Date(d.expiresAt) > new Date()).length, icon: CheckCircle, color: "text-teal bg-teal/10" },
          { label: "Expiring Soon", value: expiringSoonCount, icon: AlertTriangle, color: "text-amber-600 bg-amber-50" },
          { label: "Expired", value: expiredCount, icon: AlertTriangle, color: "text-red-500 bg-red-50" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
              <div className={`inline-flex items-center justify-center w-9 h-9 rounded-xl ${stat.color} mb-2`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="font-heading font-bold text-2xl text-navy">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-9"
          />
        </div>
        <Button variant="outline" size="md" className="flex-shrink-0">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      {/* Type filter pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {[{ id: "ALL", label: "All" }, ...DOCUMENT_TYPES].map((type) => (
          <button
            key={type.id}
            onClick={() => setTypeFilter(type.id)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              typeFilter === type.id
                ? "bg-navy text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:border-ocean hover:text-ocean"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Documents table */}
      <Card>
        <CardHeader>
          <CardTitle>Documents ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-slate-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-center">
              <FileText className="w-12 h-12 text-slate-200 mb-4" />
              <p className="text-slate-500">No documents found</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filtered.map((doc) => {
                const isExpired =
                  doc.expiresAt && new Date(doc.expiresAt) < new Date();
                const isExpiringSoon =
                  doc.expiresAt && !isExpired && (new Date(doc.expiresAt).getTime() - Date.now()) / 86400000 < 30;

                return (
                  <div
                    key={doc.id}
                    className="flex items-center gap-4 py-4 hover:bg-slate-50 -mx-6 px-6 group cursor-pointer"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-ocean/10 flex-shrink-0">
                      <FileText className="w-5 h-5 text-ocean" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-navy text-sm truncate">{doc.name}</p>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <Badge variant="secondary" className="text-xs">
                          {DOCUMENT_TYPES.find((t) => t.id === doc.type)?.label ?? doc.type}
                        </Badge>
                        {doc.boat && (
                          <span className="text-xs text-slate-400">
                            {doc.boat.name}
                          </span>
                        )}
                        {doc.fileSize && (
                          <span className="text-xs text-slate-400">
                            {formatFileSize(doc.fileSize)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0">
                      {doc.expiresAt && (
                        <div className={`flex items-center gap-1 text-xs ${
                          isExpired ? "text-red-500" : isExpiringSoon ? "text-amber-500" : "text-slate-400"
                        }`}>
                          <Calendar className="w-3 h-3" />
                          {isExpired ? "Expired" : isExpiringSoon ? "Expiring" : "Expires"}{" "}
                          {formatDate(doc.expiresAt)}
                        </div>
                      )}
                      {isExpired ? (
                        <Badge variant="danger" className="text-xs">Expired</Badge>
                      ) : isExpiringSoon ? (
                        <Badge variant="warning" className="text-xs">Expiring Soon</Badge>
                      ) : doc.expiresAt ? (
                        <Badge variant="teal" className="text-xs">Valid</Badge>
                      ) : null}
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-ocean">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
