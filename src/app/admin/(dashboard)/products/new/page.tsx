import { createProduct } from "@/app/admin/actions";
import Link from "next/link";

export default function NewProduct() {
  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Новый товар</h1>
          <p>Добавьте новый септик в каталог</p>
        </div>
      </div>

      <div className="admin-form-card">
        <form action={createProduct}>
          <div className="form-group">
            <label>Название *</label>
            <input type="text" name="name" placeholder="Например: Юнилос Астра 5" required />
          </div>

          <div className="form-group">
            <label>Описание *</label>
            <textarea name="description" placeholder="Краткое описание септика, его особенности..." required />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="form-group">
              <label>Цена (₽)</label>
              <input type="number" name="price" placeholder="85000" />
            </div>
            <div className="form-group">
              <label>Вместимость</label>
              <input type="text" name="capacity" placeholder="5 человек" />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="form-group">
              <label>Производительность</label>
              <input type="text" name="performance" placeholder="1,0 м³/сут" />
            </div>
            <div className="form-group">
              <label>Объём (м³)</label>
              <input type="text" name="volume" placeholder="1,0 м³" />
            </div>
          </div>

          <div className="form-group">
            <label>Вес (кг)</label>
            <input type="text" name="weight" placeholder="220 кг" />
          </div>

          <div className="form-group">
            <label>URL фотографии</label>
            <input type="url" name="imageUrl" placeholder="https://example.com/image.jpg" />
          </div>

          <div className="form-actions">
            <button type="submit" className="admin-btn-primary">✓ Сохранить</button>
            <Link href="/admin/products" className="admin-btn-ghost">Отмена</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
