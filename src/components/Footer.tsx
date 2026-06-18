import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo footer-logo">
              <div
                className="logo-icon"
                style={{
                  background: "#22c55e",
                  borderRadius: "8px",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                💧
              </div>
              <span
                style={{ color: "white", fontWeight: 900, fontSize: "1.2rem" }}
              >
                Эко<span style={{ color: "#22c55e" }}>Септ</span>
              </span>
            </div>
            <p className="footer-desc">
              Профессиональная установка автономных систем канализации для
              вашего дома и дачи. Работаем качественно, быстро и с гарантией.
            </p>
            <a href="tel:+78000000000" className="footer-contact-link">
              📞 +7 (800) 000-00-00
            </a>
            <a
              href="mailto:info@ecosept.ru"
              className="footer-contact-link"
              style={{ fontSize: "0.95rem", fontWeight: 500 }}
            >
              ✉ info@ecosept.ru
            </a>
          </div>

          <div className="footer-col">
            <h4>Каталог</h4>
            <nav className="footer-nav">
              <a href="/catalog">Все септики</a>
              <a href="/catalog">Для 2-3 человек</a>
              <a href="/catalog">Для 4-6 человек</a>
              <a href="/catalog">Для 7+ человек</a>
            </nav>
          </div>

          <div className="footer-col">
            <h4>Компания</h4>
            <nav className="footer-nav">
              <a href="/services">Услуги</a>
              <a href="/blog">Статьи</a>
              <a href="/contacts">Контакты</a>
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ЭкоСепт. Все права защищены.</p>
          <p>Работаем по всей России</p>
        </div>
      </div>
    </footer>
  );
}
