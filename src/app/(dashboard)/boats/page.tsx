"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Sailboat,
  AlertTriangle,
  ChevronRight,
  Search,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

interface Boat {
  id: string;
  name: string;
  make: string;
  model: string;
  year: number;
  homePort: string | null;
  estimatedValue: number | null;
  imageUrl: string | null;
  maintenanceAlerts: { id: string; priority: string }[];
  components: { id: string; status: string }[];
}

export default function BoatsPage() {
  const [boats, setBoats] = useState<Boat[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    make: "",
    model: "",
    year: new Date().getFullYear(),
    homePort: "",
    estimatedValue: "",
  });

  async function fetchBoats() {
    const res = await fetch("/api/boats");
    if (res.ok) setBoats(await res.json());
    setLoading(false);
  }

  useEffect(() => { fetchBoats(); }, []);

  async function handleAddBoat(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/boats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        year: Number(form.year),
        estimatedValue: form.estimatedValue ? Number(form.estimatedValue) : null,
      }),
    });
    if (res.ok) {
      setShowForm(false);
      setForm({ name: "", make: "", model: "", year: new Date().getFullYear(), homePort: "", estimatedValue: "" });
      fetchBoats();
    }
  }

  const filtered = boats.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      `${b.make} ${b.model}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-navy">My Fleet</h1>
          <p className="text-slate-500 mt-1">{boats.length} vessel{boats.length !== 1 ? "s" : ""} registered</p>
        </div>
        <Button variant="ocean" size="md" onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4" />
          Add Boat
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search boats..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-9"
        />
      </div>

      {/* Add boat form */}
      {showForm && (
        <Card className="border-ocean/20 bg-ocean/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-navy">Add New Boat</h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddBoat} className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Input label="Boat Name" placeholder="Sea Breeze" value={form.name} onChange={(e) => setForm(p => ({...p, name: e.target.value}))} required />
              <Input label="Make / Brand" placeholder="Beneteau" value={form.make} onChange={(e) => setForm(p => ({...p, make: e.target.value}))} required />
              <Input label="Model" placeholder="Oceanis 51.1" value={form.model} onChange={(e) => setForm(p => ({...p, model: e.target.value}))} required />
              <Input label="Year" type="number" placeholder="2021" value={form.year} onChange={(e) => setForm(p => ({...p, year: Number(e.target.value)}))} required />
              <Input label="Home Port" placeholder="Miami Marina" value={form.homePort} onChange={(e) => setForm(p => ({...p, homePort: e.target.value}))} />
              <Input label="Estimated Value ($)" type="number" placeholder="450000" value={form.estimatedValue} onChange={(e) => setForm(p => ({...p, estimatedValue: e.target.value}))} />
              <div className="col-span-2 sm:col-span-3 flex gap-3">
                <Button variant="ocean" size="md" type="submit">Add Boat</Button>
                <Button variant="ghost" size="md" type="button" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Boats grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 rounded-2xl bg-slate-100 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-6xl mb-4">⛵</div>
          <h3 className="font-heading text-xl font-semibold text-navy mb-2">
            {boats.length === 0 ? "No boats yet" : "No matches found"}
          </h3>
          <p className="text-slate-500 mb-6">
            {boats.length === 0
              ? "Add your first vessel to start tracking maintenance"
              : "Try a different search term"}
          </p>
          {boats.length === 0 && (
            <Button variant="ocean" onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4" />
              Add Your First Boat
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((boat) => {
            const criticalAlerts = boat.maintenanceAlerts.filter(
              (a) => a.priority === "CRITICAL" || a.priority === "HIGH"
            ).length;
            const componentWarnings = boat.components.filter(
              (c) => c.status === "WARNING" || c.status === "CRITICAL"
            ).length;

            return (
              <Link key={boat.id} href={`/boats/${boat.id}`}>
                <Card className="overflow-hidden hover:shadow-card-hover transition-all duration-300 cursor-pointer group">
                  {/* Boat image / placeholder */}
                  <div className="relative h-40 bg-gradient-to-br from-navy to-ocean overflow-hidden">
                    {boat.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={boat.imageUrl} alt={boat.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Sailboat className="w-16 h-16 text-white/30" />
                      </div>
                    )}
                    {criticalAlerts > 0 && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-red-500 text-white text-xs font-bold">
                        <AlertTriangle className="w-3 h-3" />
                        {criticalAlerts}
                      </div>
                    )}
                  </div>

                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-heading font-bold text-navy text-lg">
                          {boat.name}
                        </h3>
                        <p className="text-sm text-slate-500">
                          {boat.year} {boat.make} {boat.model}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-ocean transition-colors flex-shrink-0" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 flex-wrap">
                        {boat.homePort && (
                          <Badge variant="secondary" className="text-xs">
                            📍 {boat.homePort}
                          </Badge>
                        )}
                        {componentWarnings > 0 && (
                          <Badge variant="warning" className="text-xs">
                            {componentWarnings} warning{componentWarnings > 1 ? "s" : ""}
                          </Badge>
                        )}
                      </div>
                      {boat.estimatedValue && (
                        <span className="text-sm font-semibold text-teal">
                          {formatCurrency(boat.estimatedValue)}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
