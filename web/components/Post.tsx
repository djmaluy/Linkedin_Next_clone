"use client";

import { deletePost } from "@/app/actions/postActions";
import { TResponsePost } from "@/types/post";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import TimeAgo from "react-timeago";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

function Post({ post }: { post: TResponsePost }) {
  const { data: session } = useSession();

  const isAuthor = session?.userId === post.userId;

  return (
    <div className="bg-white rounded-md border">
      <div className="p-4 flex space-x-2">
        <div>
          <Avatar>
            <AvatarImage src={post.userImageUrl} />
          </Avatar>
        </div>
        <div className="flex justify-between flex-1">
          <div>
            <p className="font-semibold">
              {post.userFullName}
              {isAuthor && (
                <Badge className="ml-2" variant="secondary">
                  Author
                </Badge>
              )}
            </p>
            <p className="text-xs text-gray-400">@{post.userFullName}</p>

            <span className="text-xs text-gray-400" suppressHydrationWarning>
              <TimeAgo date={post.createdAt} />
            </span>
          </div>
          {isAuthor && (
            <Button onClick={() => deletePost(post.id)} variant="outline">
              <Trash2 />
            </Button>
          )}
        </div>
      </div>
      <div>
        <p className="px-4 pb-2 mt-2">{post.message}</p>
        {post.imageUrl && (
          <Image
            src={post.imageUrl}
            alt="Post Image"
            className="w-full mx-auto"
            height={500}
            width={500}
          />
        )}
      </div>
    </div>
  );
}

export default Post;
