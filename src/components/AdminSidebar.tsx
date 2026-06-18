"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminLogoutButton from "@/components/AdminLogoutButton";
import { useState, useEffect } from "react";

const navItems = [
  { href: "/admin", icon: "📊", label: "Дашборд" },
  { href: "/admin/leads", icon: "📥", label: "Заявки" },
  { href: "/admin/products", icon: "📦", label: "Товары" },
  { href: "/admin/services", icon: "🔧", label: "Услуги" },
  { href: "/admin/blog", icon: "📝", label: "Блог" },
];

export default function AdminSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar on path change (mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="admin-layout">
      {/* Mobile Topbar */}
      <div className="admin-mobile-topbar" style={{ display: "none" /* Handled by CSS media query */ }}>
        <h2>⚙ ЭкоСепт Admin</h2>
        <button className="admin-mobile-burger" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 40 }} 
          onClick={() => setIsOpen(false)} 
        />
      )}

      <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
        <div className="admin-logo">
          <h2>💧 ЭкоСепт</h2>
          <p>Панель управления</p>
        </div>

        <nav className="admin-nav">
          <div className="admin-nav-section">Меню</div>
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={pathname === item.href ? "active" : ""}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <AdminLogoutButton />
      </aside>

      <main className="admin-main">
        {/* We need to inject the mobile topbar inside main for proper sticky positioning in mobile */}
        <div className="admin-mobile-topbar-real">
          <h2>💧 ЭкоСепт Admin</h2>
          <button className="admin-mobile-burger" onClick={() => setIsOpen(true)}>
            ☰
          </button>
        </div>
        {children}
      </main>
    </div>
  );
}
