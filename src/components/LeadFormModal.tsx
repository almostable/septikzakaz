"use client";

import { useState } from "react";

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  source?: string;
}

export default function LeadFormModal({
  isOpen,
  onClose,
  title = "Заявка",
  source = "Сайт",
}: LeadFormModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, source }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setName("");
          setPhone("");
          onClose();
        }, 3500);
      } else {
        setError("Произошла ошибка. Попробуйте позвонить нам напрямую.");
      }
    } catch {
      setError("Ошибка соединения. Пожалуйста, перезагрузите страницу.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {success ? (
          <div className="modal-success">
            <div className="modal-success-icon">🎉</div>
            <h3>Заявка отправлена!</h3>
            <p>Наш специалист свяжется с вами в течение 10 минут. Спасибо за доверие!</p>
          </div>
        ) : (
          <>
            <p className="section-label">Бесплатная консультация</p>
            <h2 className="modal-title">{title}</h2>
            <p className="modal-subtitle">Оставьте контакты, перезвоним в течение 10 минут</p>

            {error && <div className="form-error">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn"
                style={{ width: "100%" }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Отправляем..." : "Жду звонка →"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
