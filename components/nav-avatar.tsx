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
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={getAccountPageUrl()}>My Account</Link>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  disabled={theme === "light"}
                  onSelect={() => setTheme("light")}
                >
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={theme === "dark"}
                  onSelect={() => setTheme("dark")}
                >
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={theme === "system"}
                  onSelect={() => setTheme("system")}
                >
                  System
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {isAdmin && (
          <>
            <DropdownMenuItem asChild>
              <Link href="/admin/manage-users">Manage Users</Link>
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
      <Link href={getLoginPageUrl()}>Login</Link>
    </Button>
  );
}
