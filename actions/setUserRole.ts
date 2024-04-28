import { roleLevels } from "@/app/admin/manage-users/role-levels";
import { getPropelAuthApis } from "@propelauth/nextjs/server";
import { getUser } from "@propelauth/nextjs/server/app-router";

export async function setUserRole(userId: string, role: string) {
  const newRoleLevel = roleLevels[role];
  if (newRoleLevel === undefined) throw Error("Unknown role selected.");

  const user = await getUser();
  if (!user) throw Error("You are not authenticated.");

  const org = user.getOrgByName("DCMH")!;
  if (newRoleLevel > roleLevels[org.assignedRole])
    throw Error("You can not grant a higher privileged role.");

  const api = getPropelAuthApis();

  const affectedUser = await api.fetchUserMetadataByUserId(userId, true);
  if (!affectedUser) throw Error("User does not exist");

  const oldRoleLevel =
    roleLevels[affectedUser.orgIdToOrgInfo![org.orgId].userAssignedRole];
  if (oldRoleLevel > roleLevels[org.assignedRole])
    throw Error("You can not update user with higher privileged role.");

  const success = await api.changeUserRoleInOrg({
    userId: userId,
    orgId: org.orgId,
    role,
  });
  if (!success) throw Error("Unknown error occurred.");
}
