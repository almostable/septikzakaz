import { prisma } from "@/lib/prisma";
import Link from "next/link";
import type { Metadata } from "next";
import CallToAction from "@/components/CallToAction";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Продажа и монтаж септиков под ключ — СЕПТИК ГАРАНТ",
  description: "Автономная канализация для вашего дома с гарантией до 50 лет. Монтаж за 1 день. Бесплатный выезд инженера.",
};

const advantages = [
  { icon: "🏆", title: "Гарантия до 50 лет", text: "Предоставляем расширенную гарантию на все оборудование и монтажные работы." },
  { icon: "⚡", title: "Монтаж за 1 день", text: "Быстрая установка с минимальным вмешательством в ваш участок." },
  { icon: "🔧", title: "Бесплатный выезд", text: "Инженер бесплатно приедет, замерит и подберёт оптимальный септик." },
  { icon: "📋", title: "Договор и документы", text: "Официальный договор, акт выполненных работ, гарантийный талон." },
  { icon: "🌍", title: "Любая почва и глубина", text: "Работаем с любым типом грунта, в любое время года." },
  { icon: "💬", title: "Поддержка 24/7", text: "Отвечаем на вопросы и выезжаем на гарантийный ремонт в течение суток." },
];

const steps = [
  { num: "1", title: "Заявка", text: "Оставляете заявку или звоните нам" },
  { num: "2", title: "Замер", text: "Инженер приезжает на объект бесплатно" },
  { num: "3", title: "Договор", text: "Подписываем договор с гарантией" },
  { num: "4", title: "Монтаж", text: "Устанавливаем за 1 день" },
];

export default async function HomePage() {
  const products = await prisma.product.findMany({ take: 3, orderBy: { createdAt: "desc" } });

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">✅ Более 500 установок в 2024 году</div>
            <h1>
              Септик под ключ — <br/>
              <span style={{color: "var(--green-500)", whiteSpace: "nowrap"}}>без запаха и откачки</span>
            </h1>
            <p className="hero-subtitle">
              Продаём и монтируем системы автономной канализации для частного дома и дачи. 
              Официальная гарантия до 50 лет. Звоним обратно за 5 минут.
            </p>
            <div className="hero-cta">
              <CallToAction label="Бесплатная консультация" source="Главная — Герой" />
              <Link href="/catalog" className="btn btn-white">Каталог септиков →</Link>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <strong>10+</strong>
                <span>лет на рынке</span>
              </div>
              <div className="stat-item">
                <strong>500+</strong>
                <span>объектов сдано</span>
              </div>
              <div className="stat-item">
                <strong>1 день</strong>
                <span>срок монтажа</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-photo-main">
              <img src="/images/install_crane.jpg" alt="Монтаж септика экскаватором" />
            </div>
            <div className="hero-photo-secondary">
              <img src="/images/install_1.jpg" alt="Установка септика" />
            </div>
            <div className="hero-photo-badge">
              <strong>50 лет</strong>
              гарантия
            </div>
          </div>
        </div>
      </section>

      {/* ===== ADVANTAGES ===== */}
      <section style={{ background: "#fff" }}>
        <div className="container">
          <div className="section-label">Почему нас выбирают</div>
          <h2 className="section-title">6 причин доверять нам</h2>
          <p className="section-subtitle">
            Мы работаем честно и прозрачно. Никаких скрытых платежей и пустых обещаний.
          </p>
          <div className="features-grid">
            {advantages.map((a, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{a.icon}</div>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="section-label">Процесс</div>
          <h2 className="section-title">Как проходит установка</h2>
          <p className="section-subtitle">Весь процесс занимает 1–3 дня от первого звонка до готовой канализации.</p>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <div key={i} className="step-card">
                <div className="step-num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS ===== */}
      {products.length > 0 && (
        <section style={{ background: "#fff" }}>
          <div className="container">
            <div className="section-label">Каталог</div>
            <h2 className="section-title">Популярные модели</h2>
            <p className="section-subtitle">Подберём септик для любого количества людей и любого бюджета.</p>
            <div className="products-grid">
              {products.map((p) => (
                <div key={p.id} className="product-card">
                  <div className="product-card-img">
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.name} />
                    ) : (
                      <div style={{ width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--gray-300)",fontSize:"2rem" }}>🏠</div>
                    )}
                  </div>
                  <div className="product-card-body">
                    <h3>{p.name}</h3>
                    <p className="product-capacity">👥 {p.capacity || "Уточнить"}</p>
                    <p className="product-capacity">⚙ {p.performance || "Уточнить"}</p>
                    <div className="product-price">
                      {p.price ? `${p.price.toLocaleString()} ₽` : "По запросу"}
                    </div>
                    <Link href={`/catalog/${p.id}`} className="btn btn-sm">Подробнее →</Link>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign:"center", marginTop:"40px" }}>
              <Link href="/catalog" className="btn btn-outline">Смотреть весь каталог</Link>
            </div>
          </div>
        </section>
      )}

      {/* ===== PHOTO STRIP ===== */}
      <section style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="section-label">Наши работы</div>
          <h2 className="section-title" style={{ marginBottom: "28px" }}>Монтируем профессионально</h2>
          <div className="photo-strip">
            <div className="photo-strip-item">
              <img src="/images/install_crane.jpg" alt="Монтаж с экскаватором" />
            </div>
            <div className="photo-strip-item">
              <img src="/images/inside_1.jpg" alt="Внутреннее устройство" />
            </div>
            <div className="photo-strip-item">
              <img src="/images/worker_1.jpg" alt="Работа специалиста" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{ background: "#fff" }}>
        <div className="container">
          <div className="cta-section">
            <div>
              <h2>Готовы к установке?</h2>
              <p>Закажите бесплатный замер. Инженер приедет, осмотрит участок и назовёт точную цену без скрытых доплат.</p>
            </div>
            <div className="cta-actions">
              <CallToAction label="Бесплатный выезд инженера" source="Главная — CTA" />
              <a href="tel:+78000000000" style={{ color:"rgba(255,255,255,0.6)", fontSize:"0.9rem", textAlign:"center" }}>
                или звоните: +7 (800) 000-00-00
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
