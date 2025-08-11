import { TResponsePost } from "@/types/post";
import Post from "./Post";

function PostFeed({ posts }: { posts: TResponsePost[] }) {
  return (
    <div className="space-y-2 pb-20">
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}

export default PostFeed;
