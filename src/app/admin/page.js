import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";
import AdminDashboardHeaderActions from "@/components/admin/AdminDashboardHeaderActions";
import AdminShell from "@/components/admin/AdminShell";
import { getAdminDashboardData } from "@/lib/admin-dashboard-store";
import { adminSessionCookieName, isAdminSessionValid } from "@/lib/admin-auth";
import { getContactMessages } from "@/lib/message-store";

export const metadata = {
  title: "Dashboard Admin",
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
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
      title="Selamat datang, Owner 👑"
      eyebrow="Altha Export Dashboard"
      description="Pantau semua aktivitas bisnis dalam satu layar."
      messagesCount={messages.length}
      headerActions={<AdminDashboardHeaderActions />}
      fitToViewport
    >
      <AdminDashboardClient initialData={dashboardData} messages={messages} />
    </AdminShell>
  );
}
