import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { Sidebar } from "@/components/layout/sidebar";
import { DashboardHeader } from "@/components/layout/dashboard-header";

export default async function ProviderDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/auth/login");
  if (session.user.role === "OWNER") redirect("/dashboard");

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <div className="hidden lg:flex w-64 flex-shrink-0 flex-col">
        <Sidebar
          role={session.user.role}
          user={{
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
          }}
        />
      </div>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardHeader
          user={{
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
            role: session.user.role,
          }}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
