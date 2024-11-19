"use server";
import prisma from "@/lib/prisma";

export async function getCategories() {
  return await prisma.category.findMany();
}

export async function getCategoryName(id: string) {
  return await prisma.category.findUnique({
    where: {
      id,
    },
  });
}

export async function getCategory(name: string) {
  return await prisma.category.findFirst({
    where: {
      name,
    },
  });
}

export async function addCategory(name: string) {
  return await prisma.category.create({
    data: {
      name,
    },
  });
}

export async function deleteCategory(id: string) {
  // check if the category is empty
  const items = await prisma.item.findMany({
    where: {
      categoryId: id,
    },
  });
  if (items.length > 0) {
    return { error: "Category is not empty" };
  }

  return await prisma.category.delete({
    where: {
      id,
    },
  });
}

export async function renameCategory(id: string, newName: string) {
  return await prisma.category.update({
    where: {
      id,
    },
    data: {
      name: newName,
    },
  });
}
