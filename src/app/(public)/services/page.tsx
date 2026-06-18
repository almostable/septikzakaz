import type { Metadata } from "next";
import CallToAction from "@/components/CallToAction";

export const metadata: Metadata = {
  title: "Услуги",
  description: "Монтаж, обслуживание и ремонт септиков. Работаем по всей России.",
};

const services = [
  {
    icon: "🔩",
    title: "Монтаж под ключ",
    desc: "Устанавливаем септик полностью: от доставки до пуско-наладки за 1 рабочий день. Всё включено в цену.",
    features: ["Земляные работы", "Доставка и монтаж септика", "Прокладка труб", "Пуско-наладка и инструктаж"],
  },
  {
    icon: "🛠",
    title: "Техническое обслуживание",
    desc: "Профилактическое ТО продлевает срок службы системы и предотвращает поломки. Приезжаем в удобное для вас время.",
    features: ["Диагностика и чистка фильтров", "Откачка ила и осадка", "Проверка электрооборудования", "Замена расходных материалов"],
  },
  {
    icon: "🔧",
    title: "Ремонт и восстановление",
    desc: "Ремонтируем любые модели септиков. Оригинальные запчасти в наличии. Выезжаем в течение 24 часов.",
    features: ["Замена компрессоров и насосов", "Ремонт блоков управления", "Восстановление после затопления", "Замена отдельных модулей"],
  },
  {
    icon: "📐",
    title: "Проектирование и расчёт",
    desc: "Проектируем систему под ваш участок: с учётом грунта, уровня воды и количества людей.",
    features: ["Геологоразведка участка", "Расчёт производительности", "Подбор оптимальной модели", "Смета без скрытых платежей"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <p className="section-label" style={{ color: "var(--green-500)" }}>Услуги</p>
          <h1>Всё для вашей канализации</h1>
          <p>От проектирования до обслуживания — берём на себя весь цикл работ.</p>
        </div>
      </div>

      <section>
        <div className="container">
          <div className="service-cards">
            {services.map((s, i) => (
              <div key={i} className="service-item">
                <div className="service-item-icon">{s.icon}</div>
                <h2>{s.title}</h2>
                <p>{s.desc}</p>
                <ul className="service-features">
                  {s.features.map((f, j) => (
                    <li key={j}>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "64px", background: "var(--green-50)", border: "1px solid var(--green-100)", borderRadius: "var(--radius-xl)", padding: "48px", textAlign: "center" }}>
            <h2 style={{ marginBottom: "12px" }}>Нужна консультация по услуге?</h2>
            <p style={{ color: "var(--muted)", marginBottom: "28px", maxWidth: "480px", margin: "0 auto 28px" }}>
              Расскажите о вашей задаче, и мы предложим оптимальное решение.
            </p>
            <CallToAction label="Получить бесплатную консультацию" source="Страница услуг" />
          </div>
        </div>
      </section>
    </>
  );
}
