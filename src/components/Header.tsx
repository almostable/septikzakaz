"use client";

import Link from "next/link";
import LeadFormModal from "./LeadFormModal";
import { useState, useEffect } from "react";

export default function Header() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="container header-container">
          <Link href="/" className="logo" onClick={closeMenu}>
            <div className="logo-icon">💧</div>
            <span className="logo-text">Эко<strong>Септ</strong></span>
          </Link>

          <nav className={`main-nav${isMenuOpen ? " open" : ""}`}>
            <Link href="/" onClick={closeMenu}>Главная</Link>
            <Link href="/catalog" onClick={closeMenu}>Каталог</Link>
            <Link href="/services" onClick={closeMenu}>Услуги</Link>
            <Link href="/blog" onClick={closeMenu}>Блог</Link>
            <Link href="/contacts" onClick={closeMenu}>Контакты</Link>
            <div className="mobile-nav-extra">
              <a href="tel:+78000000000" className="mobile-nav-phone">📞 +7 (800) 000-00-00</a>
              <button className="btn" style={{width:"100%"}} onClick={() => { setModalOpen(true); closeMenu(); }}>
                Заказать звонок
              </button>
            </div>
          </nav>

          {isMenuOpen && <div className="nav-overlay" onClick={closeMenu} />}

          <div className="header-actions">
            <a href="tel:+78000000000" className="header-phone">+7 (800) 000-00-00</a>
            <button className="btn btn-sm header-cta-btn" onClick={() => { setModalOpen(true); closeMenu(); }}>
              Заказать звонок
            </button>
            <button
              className={`burger-menu-btn ${isMenuOpen ? "active" : ""}`}
              onClick={() => setMenuOpen(!isMenuOpen)}
              aria-label="Меню"
            >
              <span className="burger-line" />
              <span className="burger-line" />
              <span className="burger-line" />
            </button>
          </div>
        </div>
      </header>

      <LeadFormModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Заказать звонок"
        source="Шапка сайта"
      />
    </>
  );
}
