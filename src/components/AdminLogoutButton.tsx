"use client";
import { useRouter } from "next/navigation";

export default function AdminLogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button className="admin-logout-btn" onClick={handleLogout}>
      <span>🚪</span>
      Выйти
    </button>
  );
}
