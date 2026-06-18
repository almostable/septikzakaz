import { updatePost, deletePost } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function EditPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postId = parseInt(id, 10);
  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (!post) notFound();

  const handleUpdate = updatePost.bind(null, postId);
  const handleDelete = deletePost.bind(null, postId);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Редактирование статьи</h1>
          <p>{post.title}</p>
        </div>
      </div>

      <div className="admin-form-card">
        <form action={handleUpdate}>
          <div className="form-group">
            <label>Заголовок *</label>
            <input type="text" name="title" defaultValue={post.title} required />
          </div>

          <div className="form-group">
            <label>URL-адрес (Slug) *</label>
            <input type="text" name="slug" defaultValue={post.slug} required pattern="[a-z0-9-]+" title="Только маленькие латинские буквы, цифры и дефис" />
          </div>

          <div className="form-group">
            <label>Текст статьи *</label>
            <textarea name="content" defaultValue={post.content} required style={{ minHeight: "300px" }} />
          </div>

          <div className="form-group">
            <label>URL обложки</label>
            <input type="url" name="imageUrl" defaultValue={post.imageUrl || ""} />
          </div>

          <div className="form-group" style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "24px" }}>
            <input type="checkbox" id="published" name="published" defaultChecked={post.published} style={{ width: "auto" }} />
            <label htmlFor="published" style={{ marginBottom: 0 }}>Опубликовано</label>
          </div>

          <div className="form-actions" style={{ justifyContent: "space-between", marginTop: "32px" }}>
            <div style={{ display: "flex", gap: "12px" }}>
              <button type="submit" className="admin-btn-primary">✓ Сохранить</button>
              <Link href="/admin/blog" className="admin-btn-ghost">Отмена</Link>
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
