import PostForm from "@/components/PostForm";
import UserInformation from "@/components/UserInformation";

import PostFeed from "@/components/PostFeed";
import { fetchPosts } from "./actions/postActions";

export default async function Home() {
  const posts = await fetchPosts();

  return (
    <div className="grid grid-cols-8 mt-5 sm:px-5">
      <section className="hidden md:inline md:col-span-2">
        <UserInformation />
      </section>
      <section className="col-span-full md:col-span-6 xl:col-span-4 xl:max-w-xl mx-auto w-full">
        <PostForm />
        <PostFeed posts={posts} />
      </section>
      <section className="hidden xl:inline justify-center col-span-2">
        <div className="bg-blue-500"> right </div>
        {/* right */}
      </section>
    </div>
  );
}
