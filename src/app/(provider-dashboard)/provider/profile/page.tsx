import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Star, MapPin, Phone, Globe, BadgeCheck, Plus, Wrench } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/constants";

export default async function ProviderProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");

  const provider = await prisma.serviceProvider.findUnique({
    where: { userId: session.user.id },
    include: {
      certifications: true,
      servicesOffered: true,
      user: { select: { name: true, email: true, image: true } },
    },
  });

  if (!provider) redirect("/provider/dashboard");

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-heading text-3xl font-bold text-navy">My Profile</h1>
        <p className="text-slate-500 mt-1">
          Manage your public marketplace listing
        </p>
      </div>

      {/* Profile card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6 flex-wrap">
            <div className="relative">
              <Avatar
                src={provider.logoUrl ?? provider.user.image}
                name={provider.businessName}
                size="xl"
              />
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-ocean text-white rounded-full flex items-center justify-center text-sm hover:bg-ocean-600">
                +
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <h2 className="font-heading text-2xl font-bold text-navy">
                  {provider.businessName}
                </h2>
                {provider.verified && (
                  <Badge variant="teal">
                    <BadgeCheck className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500 flex-wrap">
                {provider.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {provider.location}
                  </span>
                )}
                {provider.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {provider.phone}
                  </span>
                )}
                {provider.website && (
                  <span className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    {provider.website}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Star className="w-4 h-4 text-gold fill-gold" />
                <span className="font-semibold text-navy">
                  {provider.rating.toFixed(1)}
                </span>
                <span className="text-slate-400 text-sm">
                  ({provider.reviewCount} reviews)
                </span>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Edit Profile
            </Button>
          </div>

          {provider.description && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-slate-600 text-sm leading-relaxed">
                {provider.description}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Certifications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Certifications</CardTitle>
            <Button variant="ghost" size="sm" className="text-ocean">
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </CardHeader>
          <CardContent>
            {provider.certifications.length === 0 ? (
              <div className="text-center py-8">
                <BadgeCheck className="w-10 h-10 text-slate-200 mx-auto mb-2" />
                <p className="text-sm text-slate-400">
                  No certifications added yet
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  <Plus className="w-4 h-4" />
                  Add Certification
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {provider.certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50"
                  >
                    <BadgeCheck className="w-5 h-5 text-ocean flex-shrink-0" />
                    <div>
                      <p className="font-medium text-navy text-sm">
                        {cert.name}
                      </p>
                      {cert.issuedBy && (
                        <p className="text-xs text-slate-400">{cert.issuedBy}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Services offered */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Services Offered</CardTitle>
            <Button variant="ghost" size="sm" className="text-ocean">
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </CardHeader>
          <CardContent>
            {provider.servicesOffered.length === 0 ? (
              <div className="text-center py-8">
                <Wrench className="w-10 h-10 text-slate-200 mx-auto mb-2" />
                <p className="text-sm text-slate-400">No services listed yet</p>
                <Button variant="outline" size="sm" className="mt-3">
                  <Plus className="w-4 h-4" />
                  Add Service
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {provider.servicesOffered.map((service) => {
                  const catInfo = SERVICE_CATEGORIES.find(
                    (c) => c.id === service.category
                  );
                  return (
                    <div
                      key={service.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{catInfo?.icon ?? "🔧"}</span>
                        <div>
                          <p className="font-medium text-navy text-sm">
                            {service.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            {catInfo?.label ?? service.category}
                          </p>
                        </div>
                      </div>
                      {service.priceFrom && (
                        <span className="text-sm font-semibold text-teal">
                          From ${service.priceFrom}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
