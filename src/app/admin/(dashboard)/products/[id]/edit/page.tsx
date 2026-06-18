import { updateProduct, deleteProduct } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const productId = parseInt(id, 10);
  const product = await prisma.product.findUnique({ where: { id: productId } });

  if (!product) notFound();

  const handleUpdate = updateProduct.bind(null, productId);
  const handleDelete = deleteProduct.bind(null, productId);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Редактирование товара</h1>
          <p>{product.name}</p>
        </div>
      </div>

      <div className="admin-form-card">
        <form action={handleUpdate}>
          <div className="form-group">
            <label>Название *</label>
            <input type="text" name="name" defaultValue={product.name} required />
          </div>

          <div className="form-group">
            <label>Описание *</label>
            <textarea name="description" defaultValue={product.description} required />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="form-group">
              <label>Цена (₽)</label>
              <input type="number" name="price" defaultValue={product.price || ""} />
            </div>
            <div className="form-group">
              <label>Вместимость</label>
              <input type="text" name="capacity" defaultValue={product.capacity || ""} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="form-group">
              <label>Производительность</label>
              <input type="text" name="performance" defaultValue={product.performance || ""} />
            </div>
            <div className="form-group">
              <label>Объём (м³)</label>
              <input type="text" name="volume" defaultValue={product.volume || ""} />
            </div>
          </div>

          <div className="form-group">
            <label>Вес (кг)</label>
            <input type="text" name="weight" defaultValue={product.weight || ""} />
          </div>

          <div className="form-group">
            <label>URL фотографии</label>
            <input type="url" name="imageUrl" defaultValue={product.imageUrl || ""} />
          </div>

          <div className="form-actions" style={{ justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: "12px" }}>
              <button type="submit" className="admin-btn-primary">✓ Сохранить</button>
              <Link href="/admin/products" className="admin-btn-ghost">Отмена</Link>
            </div>
            <button formAction={handleDelete} className="admin-btn-ghost" style={{ color: "var(--a-danger)" }}>
              Удалить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
