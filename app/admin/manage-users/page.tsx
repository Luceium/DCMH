"use server";

import isAdmin from "@/lib/is-admin";
import {
  UsersPagedResponse,
  getPropelAuthApis,
} from "@propelauth/nextjs/server";
import { getUser } from "@propelauth/nextjs/server/app-router";
import { notFound } from "next/navigation";
import UserTable from "./UserTable";
import { roleLevels } from "./role-levels";

export default async function ManageUsers() {
  if (!(await isAdmin())) {
    notFound();
  }

  const user = (await getUser())!;
  const org = user.getOrgByName("DCMH")!;

  const api = getPropelAuthApis();
  const members = (await api.fetchUsersInOrg({ orgId: org.orgId })).users;

  return (
    <main className="px-8 sm:px-24 py-8">
      <UserTable
        userId={user.userId}
        userRole={org.assignedRole}
        members={
          members as (UsersPagedResponse["users"][0] & { roleInOrg: string })[]
        }
      />
    </main>
  );
}
