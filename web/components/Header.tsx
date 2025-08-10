"use client";

import {
  Briefcase,
  HomeIcon,
  MessageSquare,
  SearchIcon,
  UsersIcon,
} from "lucide-react";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

function Header() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center p-2 max-w-6xl mx-auto">
      <Image
        className="rounded-lg"
        src="/images/logo.png"
        alt="Logo"
        width={40}
        height={40}
      />
      <div className="flex-1">
        <form className="flex items-center space-x-1 bg-gray-100 p-2 rounded-md flex-1 mx-2 max-w-96">
          <SearchIcon className="h-4 text-gray-600" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent flex-1 outline-none"
          />
        </form>
      </div>
      <div className="flex items-center space-x-4 px-6">
        <Link href="/" className="icon ">
          <HomeIcon className="h-5" />
          <p>Home</p>
        </Link>
        <Link href="/" className="icon hidden md:flex ">
          <UsersIcon className="h-5" />
          <p>Network</p>
        </Link>
        <Link href="/" className="icon hidden md:flex ">
          <Briefcase className="h-5" />
          <p>Jobs</p>
        </Link>
        <Link href="/" className="icon flex f">
          <MessageSquare className="h-5" />
          <p>Messaging</p>
        </Link>

        <div>
          {session ? (
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
          ) : (
            <Button variant="outline" onClick={() => signIn("google")}>
              Sign In
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
