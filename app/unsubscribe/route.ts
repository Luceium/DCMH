import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  // get email
  const email = searchParams.get("email");
  if (!email) {
    throw new Error("No email provided");
  }
  // delete email from db
  await prisma.email.deleteMany({
    where: { email: email },
  });

  redirect("/unsubscribed");
}
