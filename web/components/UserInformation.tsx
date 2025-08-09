import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { signIn, useSession } from "next-auth/react";
import { Button } from "./ui/button";

function UserInformation() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="flex flex-col justify-center items-center bg-white py-4 mr-6 rounded-lg border">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>
          {session?.user?.name?.match(/\b\w/g)?.join("")?.toUpperCase() || ""}
        </AvatarFallback>
      </Avatar>
      {user ? (
        <div className="text-center">
          <p className="font-semibold">{user.name}</p>
          <p className="text-xs">{user?.email}</p>
        </div>
      ) : (
        <div className="text-center space-y-2">
          <p className="font-semibold">You are not signed in</p>
          <Button onClick={() => signIn("google")}>Sign In</Button>
        </div>
      )}

      <hr className="my-5 w-full border-gray-200" />

      <div className="flex justify-between w-full px-4 text-sm">
        <p className="font-semibold text-gray-400">Posts</p>
        <p className="text-blue-400">0</p>
      </div>
      <div className="flex justify-between w-full px-4 text-sm">
        <p className="font-semibold text-gray-400">Comments</p>
        <p className="text-blue-400">0</p>
      </div>
    </div>
  );
}

export default UserInformation;
