"use server";

import { TResponsePost } from "@/types/post";
import { revalidatePath } from "next/cache";
import api from "../api/index";

export async function fetchPosts(): Promise<TResponsePost[]> {
  const res = api("/posts");

  return await res;
}

export async function createPost(post: FormData) {
  const res = await api("/posts", {
    method: "post",
    data: {
      post,
    },
  });

  revalidatePath("/");

  return res;
}

export async function deletePost(id: number) {
  const res = await api(`/posts/${id}`, {
    method: "delete",
  });

  revalidatePath("/");

  return res;
}
