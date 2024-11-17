"use client";
import React, { useContext } from "react";
import { Moon, MoonIcon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import NavAvatar from "./nav-avatar";
import isAdmin from "@/lib/is-admin";
import { EditContext } from "@/lib/context";
import { Toggle } from "./ui/toggle";
import useIsAdmin from "@/lib/useIsAdmin";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  const { edit, setEdit } = useContext(EditContext);
  const { isAdmin } = useIsAdmin();
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="https://daviscommunitymeals.org">
            <Image
              src="/images/dcmh.png"
              alt="DCMH Logo"
              width={100}
              height={100}
            />
          </Link>
          <Link className="text-2xl font-bold text-secondary dark:text-blue-300" href="/">
            Pantry
          </Link>
          <div className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {isAdmin && (
              <Toggle pressed={edit} onPressedChange={() => setEdit(!edit)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </Toggle>
            )}
            <NavAvatar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;
