"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UsersPagedResponse } from "@propelauth/nextjs/server";
import { produce } from "immer";
import { useState } from "react";
import { roleLevels } from "./role-levels";
import { useToast } from "@/components/ui/use-toast";
import { setUserRole } from "@/actions/setUserRole";

export default function UserTable({
  userId,
  userRole,
  members: _members,
}: {
  userId: string;
  userRole: string;
  members: (UsersPagedResponse["users"][0] & { roleInOrg: string })[];
}) {
  const [members, setMembers] = useState(_members);
  const { toast } = useToast();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((m, i) => {
          const disabled =
            userId === m.userId ||
            roleLevels[userRole] < roleLevels[m.roleInOrg];

          return (
            <TableRow key={m.userId}>
              <TableCell>{m.email}</TableCell>
              <TableCell>{m.firstName}</TableCell>
              <TableCell>{m.lastName}</TableCell>
              <TableCell>
                <Select
                  defaultValue={m.roleInOrg}
                  value={m.roleInOrg}
                  onValueChange={async (value) => {
                    const original = m.roleInOrg;

                    setMembers(
                      produce(members, (draft) => {
                        draft[i].roleInOrg = value;
                      })
                    );

                    const { error } = await setUserRole(m.userId, value).catch(
                      () => ({ error: "Unknown error occurred." })
                    );
                    if (error) {
                      toast({
                        title: "Uh oh! Something went wrong.",
                        description: error,
                        variant: "destructive",
                      });
                      setMembers((members) =>
                        produce(members, (draft) => {
                          const index = draft.findIndex(
                            (member) => member.userId === m.userId
                          );
                          draft[index].roleInOrg = original;
                        })
                      );
                    }
                  }}
                  disabled={disabled}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Owner">Owner</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Member">Member</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
