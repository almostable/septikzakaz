import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminLeads() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Заявки</h1>
          <p>Все обращения с сайта</p>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <span className="admin-card-title">Все заявки ({leads.length})</span>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Дата</th>
              <th>Имя</th>
              <th>Телефон</th>
              <th>Email</th>
              <th>Сообщение</th>
              <th>Источник</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={7} className="admin-table-empty">Заявок пока нет</td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id}>
                  <td style={{ color: "var(--a-muted)", fontSize: "0.8rem", whiteSpace: "nowrap" }}>
                    {new Date(lead.createdAt).toLocaleString("ru-RU")}
                  </td>
                  <td style={{ fontWeight: 600 }}>{lead.name}</td>
                  <td>
                    <a href={`tel:${lead.phone}`} style={{ color: "#16a34a", fontWeight: 700 }}>
                      {lead.phone}
                    </a>
                  </td>
                  <td style={{ color: "var(--a-muted)" }}>{lead.email || "—"}</td>
                  <td style={{ color: "var(--a-muted)", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {lead.message || "—"}
                  </td>
                  <td style={{ color: "var(--a-muted)", fontSize: "0.8rem" }}>{lead.source || "—"}</td>
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
