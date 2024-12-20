"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import {
  useHostedPageUrls,
  useLogoutFunction,
  useUser,
} from "@propelauth/nextjs/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { useTheme } from "next-themes";
import useIsAdmin from "@/lib/useIsAdmin";

export default function NavAvatar() {
  const { loading, user } = useUser();
  const { isAdmin } = useIsAdmin();
  const { getLoginPageUrl, getAccountPageUrl } = useHostedPageUrls();
  const logout = useLogoutFunction();

  const { theme, setTheme } = useTheme();

  return loading ? (
    <Skeleton className="w-8 h-8 rounded-full" />
  ) : user ? (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          className="rounded-full"
          alt="Profile Picture"
          src={user.pictureUrl!}
          width={32}
          height={32}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {user.firstName
            ? user.firstName + (user.lastName ? " " + user.lastName : "")
            : user.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isAdmin && (
          <>
            <DropdownMenuItem asChild>
              <Link href="/admin/manage-users">Manage Users</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/email-list">Email List</Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem className="cursor-pointer" onClick={() => logout()}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button asChild>
      <Link href={getLoginPageUrl()} className="text-primary-content">
        Login
      </Link>
    </Button>
  );
}
