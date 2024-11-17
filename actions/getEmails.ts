'use server'

import isAdmin from "@/lib/is-admin"
import { notFound } from "next/navigation"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function getEmails() {
  if (!(await isAdmin())) {
    notFound()
  }

  const users = await prisma.email.findMany({
    select: {
      email: true,
    },
  })

  return users.map(user => user.email)
}