import "../admin.css";
import AdminSidebar from "@/components/AdminSidebar";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export const metadata = { title: "Панель управления — ЭкоСепт" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  
  if (!session.isLoggedIn) {
    redirect("/admin/login");
  }

  return <AdminSidebar>{children}</AdminSidebar>;
}
