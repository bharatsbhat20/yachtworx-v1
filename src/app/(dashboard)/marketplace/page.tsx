"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Star, MapPin, BadgeCheck, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { SERVICE_CATEGORIES } from "@/lib/constants";

interface Provider {
  id: string;
  businessName: string;
  description: string | null;
  location: string | null;
  rating: number;
  reviewCount: number;
  verified: boolean;
  logoUrl: string | null;
  certifications: { id: string; name: string }[];
  servicesOffered: { id: string; category: string; name: string; priceFrom: number | null }[];
  user: { name: string | null; image: string | null };
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i <= Math.round(rating)
              ? "text-gold fill-gold"
              : "text-slate-200 fill-slate-200"
          }`}
        />
      ))}
      <span className="text-xs text-slate-500 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function MarketplacePage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");

  async function fetchProviders() {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category !== "ALL") params.set("category", category);
    const res = await fetch(`/api/providers?${params}`);
    if (res.ok) setProviders(await res.json());
    setLoading(false);
  }

  useEffect(() => { fetchProviders(); }, [search, category]); // eslint-disable-line

  const categories = [{ id: "ALL", label: "All Services" }, ...SERVICE_CATEGORIES];

  // Demo providers for empty state
  const demoProviders: Provider[] = [
    {
      id: "demo-1",
      businessName: "BlueWater Marine Services",
      description: "Expert marine mechanics serving the Miami coastline for 15+ years. Specializing in diesel engines and hull repairs.",
      location: "Miami, FL",
      rating: 4.9,
      reviewCount: 127,
      verified: true,
      logoUrl: null,
      certifications: [{ id: "c1", name: "ABYC Certified" }, { id: "c2", name: "Yamaha Master Tech" }],
      servicesOffered: [
        { id: "s1", category: "ENGINE", name: "Engine Overhaul", priceFrom: 800 },
        { id: "s2", category: "HULL", name: "Hull Inspection", priceFrom: 200 },
      ],
      user: { name: "Capt. Marcus Reed", image: null },
    },
    {
      id: "demo-2",
      businessName: "Coastal Yacht Care",
      description: "Premium yacht maintenance and detailing. We keep your vessel show-room ready year round.",
      location: "Fort Lauderdale, FL",
      rating: 4.8,
      reviewCount: 89,
      verified: true,
      logoUrl: null,
      certifications: [{ id: "c3", name: "NMEA 2000 Certified" }],
      servicesOffered: [
        { id: "s3", category: "DETAILING", name: "Full Detailing", priceFrom: 350 },
        { id: "s4", category: "ELECTRICAL", name: "Electrical Repairs", priceFrom: 150 },
      ],
      user: { name: "Sarah Chen", image: null },
    },
    {
      id: "demo-3",
      businessName: "Neptune Navigation Systems",
      description: "Electronics and navigation specialists. Chartplotter installation, AIS, radar, and marine audio.",
      location: "Key West, FL",
      rating: 5.0,
      reviewCount: 43,
      verified: true,
      logoUrl: null,
      certifications: [{ id: "c5", name: "Garmin Certified" }, { id: "c6", name: "Simrad Dealer" }],
      servicesOffered: [
        { id: "s7", category: "NAVIGATION", name: "Chartplotter Install", priceFrom: 400 },
        { id: "s8", category: "ELECTRICAL", name: "Marine Electronics", priceFrom: 250 },
      ],
      user: { name: "Derek Weston", image: null },
    },
    {
      id: "demo-4",
      businessName: "AnchorPoint Rigging",
      description: "Sailing rigging specialists. Standing rigging, running rigging, mast work, and sail repair.",
      location: "Newport, RI",
      rating: 4.7,
      reviewCount: 64,
      verified: false,
      logoUrl: null,
      certifications: [{ id: "c7", name: "Sail Loft Certified" }],
      servicesOffered: [
        { id: "s9", category: "RIGGING", name: "Standing Rigging", priceFrom: 500 },
        { id: "s10", category: "SAFETY", name: "Safety Inspection", priceFrom: 180 },
      ],
      user: { name: "Tom Harrington", image: null },
    },
    {
      id: "demo-5",
      businessName: "Poseidon Painting Co.",
      description: "Professional antifouling, topside painting, and varnish work. Your boat deserves to look its best.",
      location: "Annapolis, MD",
      rating: 4.6,
      reviewCount: 91,
      verified: true,
      logoUrl: null,
      certifications: [{ id: "c8", name: "Awlgrip Certified" }],
      servicesOffered: [
        { id: "s11", category: "PAINTING", name: "Antifouling Paint", priceFrom: 600 },
        { id: "s12", category: "HULL", name: "Gel Coat Repair", priceFrom: 300 },
      ],
      user: { name: "Maria Santos", image: null },
    },
    {
      id: "demo-6",
      businessName: "Horizon Mechanical",
      description: "Full-service engine shop. Inboard diesels, outboards, generator service, and marine plumbing.",
      location: "San Diego, CA",
      rating: 4.8,
      reviewCount: 156,
      verified: true,
      logoUrl: null,
      certifications: [{ id: "c9", name: "Volvo Penta Dealer" }, { id: "c10", name: "Yanmar Certified" }],
      servicesOffered: [
        { id: "s13", category: "ENGINE", name: "Engine Service", priceFrom: 250 },
        { id: "s14", category: "PLUMBING", name: "Plumbing Repair", priceFrom: 120 },
      ],
      user: { name: "Jake Miller", image: null },
    },
  ];

  const displayProviders = providers.length > 0 ? providers : demoProviders;

  const filtered = displayProviders.filter((p) => {
    const matchesSearch =
      !search ||
      p.businessName.toLowerCase().includes(search.toLowerCase()) ||
      (p.location ?? "").toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      category === "ALL" ||
      p.servicesOffered.some((s) => s.category === category);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-navy">Service Marketplace</h1>
        <p className="text-slate-500 mt-1">
          Find certified marine mechanics near you
        </p>
      </div>

      {/* Search & filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or location..."
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

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              category === cat.id
                ? "bg-navy text-white shadow-sm"
                : "bg-white border border-slate-200 text-slate-600 hover:border-ocean hover:text-ocean"
            }`}
          >
            {"icon" in cat && <span className="mr-1.5">{cat.icon}</span>}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-slate-500">
        {filtered.length} provider{filtered.length !== 1 ? "s" : ""} found
        {providers.length === 0 && (
          <span className="text-xs text-ocean ml-2">
            (showing demo data — register as a provider to appear here)
          </span>
        )}
      </p>

      {/* Provider grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 rounded-2xl bg-slate-100 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Wrench className="w-12 h-12 text-slate-200 mb-4" />
          <h3 className="font-heading font-semibold text-navy mb-2">No providers found</h3>
          <p className="text-slate-500 text-sm">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((provider) => (
            <Card key={provider.id} className="hover:shadow-card-hover transition-all duration-300 overflow-hidden group">
              <CardContent className="p-6">
                {/* Provider header */}
                <div className="flex items-start gap-3 mb-4">
                  <Avatar
                    src={provider.logoUrl}
                    name={provider.businessName}
                    size="lg"
                    className="flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-heading font-bold text-navy text-base leading-tight">
                        {provider.businessName}
                      </h3>
                      {provider.verified && (
                        <BadgeCheck className="w-4 h-4 text-ocean flex-shrink-0" />
                      )}
                    </div>
                    <StarRating rating={provider.rating} />
                    <p className="text-xs text-slate-400 mt-0.5">
                      {provider.reviewCount} reviews
                    </p>
                  </div>
                </div>

                {/* Location */}
                {provider.location && (
                  <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-ocean" />
                    {provider.location}
                  </div>
                )}

                {/* Description */}
                {provider.description && (
                  <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">
                    {provider.description}
                  </p>
                )}

                {/* Certifications */}
                {provider.certifications.length > 0 && (
                  <div className="flex gap-1.5 flex-wrap mb-4">
                    {provider.certifications.slice(0, 2).map((cert) => (
                      <Badge key={cert.id} variant="ocean" className="text-xs">
                        <BadgeCheck className="w-2.5 h-2.5 mr-1" />
                        {cert.name}
                      </Badge>
                    ))}
                    {provider.certifications.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{provider.certifications.length - 2} more
                      </Badge>
                    )}
                  </div>
                )}

                {/* Service categories */}
                {provider.servicesOffered.length > 0 && (
                  <div className="flex gap-1.5 flex-wrap mb-4">
                    {Array.from(new Set(provider.servicesOffered.map((s) => s.category)))
                      .slice(0, 3)
                      .map((cat) => {
                        const catInfo = SERVICE_CATEGORIES.find((c) => c.id === cat);
                        return (
                          <Badge key={cat} variant="secondary" className="text-xs">
                            {catInfo?.icon} {catInfo?.label ?? cat}
                          </Badge>
                        );
                      })}
                  </div>
                )}

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  {provider.servicesOffered.length > 0 &&
                    provider.servicesOffered[0].priceFrom && (
                      <div>
                        <span className="text-xs text-slate-400">From </span>
                        <span className="font-heading font-bold text-navy">
                          ${provider.servicesOffered[0].priceFrom}
                        </span>
                      </div>
                    )}
                  <Button variant="ocean" size="sm" className="ml-auto">
                    Request Service
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
