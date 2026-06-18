import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post) return { title: "Статья не найдена" };
  return { title: `${post.title} — Блог ЭкоСепт` };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article>
      <div className="page-hero" style={{ padding: "88px 0 60px" }}>
        <div
          className="container"
          style={{ maxWidth: "800px", textAlign: "center" }}
        >
          <Link
            href="/blog"
            style={{
              display: "inline-block",
              color: "var(--primary)",
              fontWeight: 700,
              marginBottom: "24px",
            }}
          >
            ← Назад в блог
          </Link>
          <h1
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              marginBottom: "20px",
            }}
          >
            {post.title}
          </h1>
          <span style={{ color: "var(--gray-400)", fontSize: "1rem" }}>
            {new Date(post.createdAt).toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      <section style={{ paddingTop: "60px", paddingBottom: "100px" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          {post.imageUrl && (
            <div
              style={{
                width: "100%",
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                marginBottom: "48px",
                boxShadow: "var(--shadow-md)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.imageUrl}
                alt={post.title}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          )}

          <div
            className="blog-content"
            style={{
              fontSize: "1.1rem",
              lineHeight: 1.8,
              color: "var(--text)",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {post.content}
          </div>
        </div>
      </section>
    </article>
  );
}
