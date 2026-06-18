import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminBlog() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Блог</h1>
          <p>Управление статьями</p>
        </div>
        <Link href="/admin/blog/new" className="admin-btn-primary">
          + Добавить статью
        </Link>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <span className="admin-card-title">Все статьи ({posts.length})</span>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Дата</th>
              <th>Заголовок</th>
              <th>Slug</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="admin-table-empty">
                  <p style={{ fontSize: "2rem", marginBottom: "12px" }}>📝</p>
                  Статей пока нет. <Link href="/admin/blog/new" style={{ color: "#16a34a", fontWeight: 600 }}>Написать первую →</Link>
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id}>
                  <td style={{ color: "var(--a-muted)", fontSize: "0.8rem", whiteSpace: "nowrap" }}>
                    {new Date(post.createdAt).toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" })}
                  </td>
                  <td>
                    <span style={{ fontWeight: 700 }}>{post.title}</span>
                  </td>
                  <td style={{ color: "var(--a-muted)" }}>{post.slug}</td>
                  <td>
                    {post.published ? (
                      <span className="admin-badge NEW">Опубликовано</span>
                    ) : (
                      <span className="admin-badge CLOSED">Черновик</span>
                    )}
                  </td>
                  <td>
                    <Link href={`/admin/blog/${post.id}/edit`} className="admin-btn-ghost">
                      ✏ Редактировать
                    </Link>
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
