import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = { title: "Блог — Полезные статьи о септиках" };

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <p className="section-label" style={{ color: "var(--green-500)" }}>Блог</p>
          <h1>Полезные статьи</h1>
          <p>Всё о выборе, установке и обслуживании автономной канализации.</p>
        </div>
      </div>
      <section>
        <div className="container">
          {posts.length === 0 ? (
            <div className="blog-empty">
              <p style={{ fontSize: "3rem", marginBottom: "16px" }}>📖</p>
              <p>Раздел скоро будет наполнен полезными статьями!</p>
            </div>
          ) : (
            <div className="blog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "32px" }}>
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="blog-card" style={{ display: "block", background: "var(--white)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", overflow: "hidden", textDecoration: "none", color: "inherit", transition: "all var(--transition)" }}>
                  {post.imageUrl && (
                    <div className="blog-card-img" style={{ height: "200px", background: "var(--gray-100)" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={post.imageUrl} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  )}
                  <div className="blog-card-body" style={{ padding: "24px" }}>
                    <p style={{ color: "var(--a-muted)", fontSize: "0.85rem", marginBottom: "8px" }}>
                      {new Date(post.createdAt).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                    <h2 style={{ fontSize: "1.2rem", marginBottom: "12px", lineHeight: 1.4 }}>{post.title}</h2>
                    <p style={{ color: "var(--muted)", fontSize: "0.95rem", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {post.content.slice(0, 150)}...
                    </p>
                    <div style={{ marginTop: "16px", color: "var(--primary)", fontWeight: 600, fontSize: "0.9rem" }}>
                      Читать статью →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
