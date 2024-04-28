import { getPropelAuthApis } from "@propelauth/nextjs/server";
import { getUser } from "@propelauth/nextjs/server/app-router";
import { redirect } from "next/navigation";

export default async function Authenticated() {
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  if (!user.getOrgByName("DCMH")) {
    const api = getPropelAuthApis();
    const org = (await api.fetchOrgByQuery({ name: "DCMH" })).orgs[0];
    await api.addUserToOrg({
      userId: user.userId,
      orgId: org.orgId,
      role: "Member",
    });
  }
  redirect("/");
}
