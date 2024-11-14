"use server";
import prisma from "@/lib/prisma";

export async function getCategories() {
  return await prisma.category.findMany();
}

export async function getCategory(id: string) {
  return await prisma.category.findUnique({
    where: {
      id,
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
