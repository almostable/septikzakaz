import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminProducts() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Товары</h1>
          <p>Управление каталогом септиков</p>
        </div>
        <Link href="/admin/products/new" className="admin-btn-primary">
          + Добавить товар
        </Link>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <span className="admin-card-title">Каталог ({products.length})</span>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Название</th>
              <th>Цена</th>
              <th>Вместимость</th>
              <th>Производительность</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="admin-table-empty">
                  <p style={{ fontSize: "2rem", marginBottom: "12px" }}>📦</p>
                  Товаров пока нет. <Link href="/admin/products/new" style={{ color: "#16a34a", fontWeight: 600 }}>Добавить первый →</Link>
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <span style={{ fontWeight: 700 }}>{product.name}</span>
                  </td>
                  <td style={{ fontWeight: 700, color: "#16a34a" }}>
                    {product.price ? `${product.price.toLocaleString()} ₽` : <span style={{ color: "var(--a-muted)", fontWeight: 400 }}>Не указана</span>}
                  </td>
                  <td style={{ color: "var(--a-muted)" }}>{product.capacity || "—"}</td>
                  <td style={{ color: "var(--a-muted)" }}>{product.performance || "—"}</td>
                  <td>
                    <Link href={`/admin/products/${product.id}/edit`} className="admin-btn-ghost">
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
