"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") ? parseInt(formData.get("price") as string, 10) : null;
  const capacity = formData.get("capacity") as string;
  const performance = formData.get("performance") as string;
  const volume = formData.get("volume") as string;
  const weight = formData.get("weight") as string;
  const imageUrl = formData.get("imageUrl") as string;

  await prisma.product.create({
    data: {
      name,
      description,
      price,
      capacity,
      performance,
      volume,
      weight,
      imageUrl,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/catalog");
  redirect("/admin/products");
}

export async function updateProduct(id: number, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") ? parseInt(formData.get("price") as string, 10) : null;
  const capacity = formData.get("capacity") as string;
  const performance = formData.get("performance") as string;
  const volume = formData.get("volume") as string;
  const weight = formData.get("weight") as string;
  const imageUrl = formData.get("imageUrl") as string;

  await prisma.product.update({
    where: { id },
    data: {
      name,
      description,
      price,
      capacity,
      performance,
      volume,
      weight,
      imageUrl,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/catalog");
  redirect("/admin/products");
}

export async function deleteProduct(id: number) {
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  revalidatePath("/catalog");
  redirect("/admin/products");
}

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const published = formData.get("published") === "on";

  await prisma.post.create({
    data: {
      title,
      slug,
      content,
      imageUrl,
      published,
    },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function updatePost(id: number, formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const published = formData.get("published") === "on";

  await prisma.post.update({
    where: { id },
    data: {
      title,
      slug,
      content,
      imageUrl,
      published,
    },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  redirect("/admin/blog");
}

export async function deletePost(id: number) {
  await prisma.post.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}
