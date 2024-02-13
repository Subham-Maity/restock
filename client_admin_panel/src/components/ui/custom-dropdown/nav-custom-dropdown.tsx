import {
  CreditCard,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
} from "lucide-react";

import { Button } from "@/components/ui/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";
import Image from "next/image";
import React from "react";
import { globalBgConfig } from "@/app/global-bg-config";
import Link from "next/link";

export function DropdownMenuCustom({ ...props }) {
  const user = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="dark:border-[#7BFE88]/50  border-[#0ac31c]/50 border "
      >
        <Button className="h-10 w-10 p-0.5  rounded-full bg-gray-500 dark:bg-gray-500 flex items-center justify-center text-white dark:hover:bg-gray-300 drop  text-lg">
          {user &&
          user.addresses &&
          user.addresses[0] &&
          user.addresses[0].dpUrl ? (
            <Image
              src={user.addresses[0].dpUrl}
              alt=""
              width={40}
              height={40}
            />
          ) : user && user.email ? (
            <div
              className="h-9 w-9 rounded-full text-[#7BFE88] bg-gray-500 dark:bg-gray-700 flex items-center justify-center dark:hover:bg-gray-600 drop  text-lg"
              style={{ fontSize: "1.5rem" }}
            >
              <p className="mt-1">{user.email[0].toUpperCase()}</p>
            </div>
          ) : (
            <Image
              className="h-10 w-10 p-2 rounded-full bg-gray-500 dark:bg-gray-700 flex items-center justify-center text-white dark:hover:bg-gray-600 drop  text-lg"
              src="/profile/user.svg"
              alt=""
              width={40}
              height={40}
            />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`dark:bg-[#111921] bg-stone-300 w-56 rounded-lg mr-6`}
      >
        <DropdownMenuLabel className="text-gray-800 dark:text-gray-300">
          <div>
            <div className="text-sm ml-4 mb-2 mt-4 font-medium leading-none ">
              {user?.addresses && user.addresses[0]
                ? user.addresses[0].name
                : "No Name Provided"}
            </div>
            <div className="text-sm ml-4 mb-2 mt-4 font-bold break-words leading-none text-gray-950 dark:text-gray-300 ">
              {user?.email && user.email ? user.email : "No Email Provided"}
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Invite users</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className={`${globalBgConfig}`}>
                <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Message</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span>More...</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <Plus className="mr-2 h-4 w-4" />
            <span>New Team</span>
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <div>
          {user ? (
            <Link href="/logout">
              <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
          ) : (
            <Link href="/login">
              <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                <LogOut className="mr-2 h-4 w-4" />
                <span> Log in</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
