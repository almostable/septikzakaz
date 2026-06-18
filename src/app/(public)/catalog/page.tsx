import { prisma } from "@/lib/prisma";
import Link from "next/link";
import type { Metadata } from "next";
import CallToAction from "@/components/CallToAction";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Каталог септиков",
  description: "Выберите септик для вашего дома. Разные объёмы и производительности. Цены от производителя.",
};

export default async function CatalogPage() {
  const products = await prisma.product.findMany({ orderBy: { price: "asc" } });

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <p className="section-label" style={{ color: "var(--green-500)" }}>Каталог</p>
          <h1>Септики для вашего дома</h1>
          <p>
            Подбираем систему под нужды вашей семьи, тип грунта и бюджет.
            Бесплатный выезд инженера для точного расчёта.
          </p>
        </div>
      </div>

      <section>
        <div className="container">
          {products.length === 0 ? (
            <div className="blog-empty">
              <p style={{ fontSize: "3rem", marginBottom: "16px" }}>📦</p>
              <p>Каталог пока пуст. Скоро здесь появятся товары!</p>
            </div>
          ) : (
            <div className="products-grid">
              {products.map((p) => (
                <div key={p.id} className="product-card">
                  <div className="product-card-img">
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.name} />
                    ) : (
                      <div style={{ width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--gray-300)",fontSize:"3rem" }}>🏠</div>
                    )}
                  </div>
                  <div className="product-card-body">
                    <h3>{p.name}</h3>
                    <p className="product-capacity">👥 Вместимость: {p.capacity || "Уточнить"}</p>
                    <p className="product-capacity">⚡ Производительность: {p.performance || "Уточнить"}</p>
                    <div className="product-price">
                      {p.price ? (
                        <>{p.price.toLocaleString()} ₽ <span className="product-price-note">/ под ключ</span></>
                      ) : (
                        "Цена по запросу"
                      )}
                    </div>
                    <Link href={`/catalog/${p.id}`} className="btn btn-sm">Подробнее →</Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: "56px", background: "var(--green-50)", border: "1px solid var(--green-100)", borderRadius: "var(--radius-xl)", padding: "40px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
            <div>
              <h3 style={{ marginBottom: "8px" }}>Не знаете, какой выбрать?</h3>
              <p style={{ color: "var(--muted)", maxWidth: "400px" }}>
                Инженер бесплатно приедет, оценит участок и подберёт оптимальный вариант под ваш бюджет.
              </p>
            </div>
            <CallToAction label="Вызвать инженера бесплатно" source="Каталог — баннер" />
          </div>
        </div>
      </section>
    </>
  );
}
