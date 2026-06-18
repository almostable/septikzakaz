import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import CallToAction from "@/components/CallToAction";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id: parseInt(id, 10) } });
  if (!product) notFound();

  const specs = [
    { label: "Вместимость", value: product.capacity },
    { label: "Производительность", value: product.performance },
    { label: "Объём", value: product.volume },
    { label: "Вес", value: product.weight },
  ].filter((s) => s.value);

  return (
    <>
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--border)", padding: "16px 0" }}>
        <div className="container">
          <nav style={{ fontSize: "0.85rem", color: "var(--muted)", display: "flex", gap: "8px", alignItems: "center" }}>
            <Link href="/" style={{ color: "var(--muted)" }}>Главная</Link>
            <span>/</span>
            <Link href="/catalog" style={{ color: "var(--muted)" }}>Каталог</Link>
            <span>/</span>
            <span style={{ color: "var(--dark)", fontWeight: 600 }}>{product.name}</span>
          </nav>
        </div>
      </div>

      <section>
        <div className="container">
          <div className="product-detail-layout">
            <div className="product-gallery-main">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} />
              ) : (
                <div className="no-image">🏠</div>
              )}
            </div>

            <div>
              <p className="section-label">Автономная канализация</p>
              <h1 style={{ fontSize: "2rem", marginBottom: "8px" }}>{product.name}</h1>

              <div className="product-detail-price">
                {product.price ? (
                  <>{product.price.toLocaleString()} ₽ <span>/ под ключ</span></>
                ) : (
                  "Цена по запросу"
                )}
              </div>

              {product.description && (
                <p className="product-desc">{product.description}</p>
              )}

              {specs.length > 0 && (
                <div className="product-specs-table">
                  <h3 style={{ marginBottom: "16px", fontSize: "1rem", color: "var(--muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Характеристики
                  </h3>
                  {specs.map((s, i) => (
                    <div key={i} className="spec-row">
                      <span className="spec-label">{s.label}</span>
                      <span className="spec-value">{s.value}</span>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <CallToAction label="Заказать монтаж" source={`Товар — ${product.name}`} />
                <a href="tel:+78000000000" className="btn btn-outline">📞 Позвонить</a>
              </div>

              <div style={{ marginTop: "28px", background: "var(--green-50)", border: "1px solid var(--green-100)", borderRadius: "var(--radius-md)", padding: "18px 20px", display: "flex", gap: "12px" }}>
                <span style={{ fontSize: "1.5rem" }}>🛡</span>
                <div>
                  <p style={{ fontWeight: 700, marginBottom: "4px", fontSize: "0.95rem" }}>Гарантия включена</p>
                  <p style={{ color: "var(--muted)", fontSize: "0.875rem" }}>Официальный договор, акт выполненных работ и гарантийный талон на все виды работ.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
