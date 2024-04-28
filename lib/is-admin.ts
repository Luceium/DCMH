import { getUser } from "@propelauth/nextjs/server/app-router";

export default async function isAdmin() {
  const user = await getUser();
  if (!user) return false;

  const org = user.getOrgByName("DCMH");
  if (!org) return false;
  return org.isAtLeastRole("Admin");
}
