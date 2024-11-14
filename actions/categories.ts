import prisma from "@/lib/prisma";

export async function getEnabledCategories() {
  return await prisma.category.findMany();
}

export async function addCategory(name: string) {
  return await prisma.category.create({
    data: {
      name,
    },
  });
}

export async function deleteCategory(name: string) {
  return await prisma.category.delete({
    where: {
      name,
    },
  });
}

export async function renameCategory(oldName: string, newName: string) {
  return await prisma.category.update({
    where: {
      name: oldName,
    },
    data: {
      name: newName,
    },
  });
}