import { createPost } from "@/app/admin/actions";
import Link from "next/link";

export default function NewPost() {
  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Новая статья</h1>
          <p>Написать статью в блог</p>
        </div>
      </div>

      <div className="admin-form-card">
        <form action={createPost}>
          <div className="form-group">
            <label>Заголовок *</label>
            <input type="text" name="title" placeholder="Например: Как выбрать септик для дома" required />
          </div>

          <div className="form-group">
            <label>URL-адрес (Slug) *</label>
            <input type="text" name="slug" placeholder="kak-vybrat-septik" required pattern="[a-z0-9-]+" title="Только маленькие латинские буквы, цифры и дефис" />
          </div>

          <div className="form-group">
            <label>Текст статьи *</label>
            <textarea name="content" placeholder="Содержание статьи..." required style={{ minHeight: "300px" }} />
          </div>

          <div className="form-group">
            <label>URL обложки</label>
            <input type="url" name="imageUrl" placeholder="https://example.com/image.jpg" />
          </div>

          <div className="form-group" style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "24px" }}>
            <input type="checkbox" id="published" name="published" defaultChecked style={{ width: "auto" }} />
            <label htmlFor="published" style={{ marginBottom: 0 }}>Опубликовать сразу</label>
          </div>

          <div className="form-actions" style={{ marginTop: "32px" }}>
            <button type="submit" className="admin-btn-primary">✓ Сохранить</button>
            <Link href="/admin/blog" className="admin-btn-ghost">Отмена</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
