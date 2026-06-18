import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [leads, newLeadCount, productCount] = await Promise.all([
    prisma.lead.findMany({ take: 8, orderBy: { createdAt: "desc" } }),
    prisma.lead.count({ where: { status: "NEW" } }),
    prisma.product.count(),
  ]);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Дашборд</h1>
          <p>Обзор активности сайта</p>
        </div>
      </div>

      {/* Stats */}
      <div className="admin-stats-row">
        <div className="admin-stat-card">
          <div className="admin-stat-label">📥 Новых заявок</div>
          <div className="admin-stat-value" style={{ color: newLeadCount > 0 ? "#16a34a" : "inherit" }}>
            {newLeadCount}
          </div>
          <div className="admin-stat-sub">
            <Link href="/admin/leads" style={{ color: "#16a34a", fontWeight: 600 }}>Смотреть все →</Link>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">📦 Товаров в каталоге</div>
          <div className="admin-stat-value">{productCount}</div>
          <div className="admin-stat-sub">
            <Link href="/admin/products" style={{ color: "#16a34a", fontWeight: 600 }}>Управление →</Link>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">📊 Всего заявок</div>
          <div className="admin-stat-value">{leads.length > 0 ? leads.length + "+" : 0}</div>
          <div className="admin-stat-sub">За всё время</div>
        </div>
      </div>

      {/* Recent Leads */}
      <div className="admin-card">
        <div className="admin-card-header">
          <span className="admin-card-title">Последние заявки</span>
          <Link href="/admin/leads" className="admin-btn-ghost">Все заявки →</Link>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Дата</th>
              <th>Имя</th>
              <th>Телефон</th>
              <th>Источник</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={5} className="admin-table-empty">
                  Заявок пока нет
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id}>
                  <td style={{ color: "var(--a-muted)", fontSize: "0.8rem" }}>
                    {new Date(lead.createdAt).toLocaleString("ru-RU")}
                  </td>
                  <td style={{ fontWeight: 600 }}>{lead.name}</td>
                  <td>
                    <a href={`tel:${lead.phone}`} style={{ color: "#16a34a", fontWeight: 600 }}>
                      {lead.phone}
                    </a>
                  </td>
                  <td style={{ color: "var(--a-muted)" }}>{lead.source || "—"}</td>
                  <td>
                    <span className={`admin-badge ${lead.status}`}>{lead.status}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
