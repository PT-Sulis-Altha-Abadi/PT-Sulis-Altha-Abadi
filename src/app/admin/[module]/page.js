import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import AdminModuleManager from "@/components/admin/AdminModuleManager";
import AdminShell from "@/components/admin/AdminShell";
import { adminModuleMap } from "@/data/admin-dashboard-config";
import { getAdminDashboardData } from "@/lib/admin-dashboard-store";
import { adminSessionCookieName, isAdminSessionValid } from "@/lib/admin-auth";
import { getContactMessages } from "@/lib/message-store";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { module: slug } = await params;
  const adminModule = adminModuleMap[slug];

  return {
    title: adminModule ? `${adminModule.title} Admin` : "Admin",
  };
}

export default async function AdminModulePage({ params }) {
  const { module: slug } = await params;
  const adminModule = adminModuleMap[slug];

  if (!adminModule) {
    notFound();
  }

  const cookieStore = await cookies();
  const session = cookieStore.get(adminSessionCookieName)?.value;

  if (!isAdminSessionValid(session)) {
    redirect("/admin/login");
  }

  const [messages, dashboardData] = await Promise.all([
    getContactMessages(),
    getAdminDashboardData(),
  ]);

  return (
    <AdminShell
      active={adminModule.slug}
      title={adminModule.title}
      description={adminModule.description}
      messagesCount={messages.length}
    >
      <AdminModuleManager module={adminModule} initialData={dashboardData} />
    </AdminShell>
  );
}
