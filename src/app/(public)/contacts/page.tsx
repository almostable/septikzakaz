"use client";

import { useState } from "react";
import type { Metadata } from "next";

const contacts = [
  { label: "Телефон", value: "+7 (800) 000-00-00", href: "tel:+78000000000" },
  { label: "Email", value: "info@ecosept.ru", href: "mailto:info@ecosept.ru" },
  {
    label: "Адрес",
    value: "г. Казань, ул. Примерная, д. 1, офис 101",
    href: null,
  },
  { label: "Режим работы", value: "Пн–Вс, 8:00 — 20:00", href: null },
];

export default function ContactsPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message, source: "Контакты" }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <p className="section-label" style={{ color: "var(--green-500)" }}>
            Контакты
          </p>
          <h1>Мы на связи</h1>
          <p>Ответим в течение 10 минут в рабочее время.</p>
        </div>
      </div>

      <section>
        <div className="container">
          <div className="contacts-layout">
            <div className="contact-info-block">
              {contacts.map((c, i) => (
                <div key={i} className="contact-info-item">
                  <h3>{c.label}</h3>
                  {c.href ? <a href={c.href}>{c.value}</a> : <p>{c.value}</p>}
                </div>
              ))}

              <div style={{ marginTop: "8px" }}>
                <h3
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "16px",
                  }}
                >
                  Как добраться
                </h3>
                <div
                  style={{
                    background: "var(--gray-200)",
                    borderRadius: "var(--radius-lg)",
                    height: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--muted)",
                  }}
                >
                  🗺 Карта
                </div>
              </div>
            </div>

            <div className="contact-form-card">
              <h3>Напишите нам</h3>
              <p>Расскажите о вашей задаче — мы ответим и предложим решение.</p>

              {status === "success" ? (
                <div className="form-success">
                  ✅ Сообщение отправлено! Позвоним вам в ближайшее время.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {status === "error" && (
                    <div className="form-error">
                      Ошибка отправки. Пожалуйста, позвоните нам напрямую.
                    </div>
                  )}
                  <div className="form-group">
                    <label>Ваше имя</label>
                    <input
                      type="text"
                      placeholder="Иван Иванов"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Телефон</label>
                    <input
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Сообщение (необязательно)</label>
                    <textarea
                      placeholder="Опишите вашу задачу..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn"
                    style={{ width: "100%" }}
                    disabled={status === "loading"}
                  >
                    {status === "loading"
                      ? "Отправка..."
                      : "Отправить сообщение"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
