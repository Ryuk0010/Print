import { Appbar } from "../components/Appbar";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";

export const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, blog } = useBlog({ id: id || "" });

if (loading) {
  return (
    <div>
      <BlogSkeleton/>
    </div>
  );
}

  if (!blog) {
    return (
      <div>
        <Appbar/>
        Blog not found.
      </div>
    );
  }

  return (
    <div>
      <Appbar/>
      <FullBlog blog={blog}/>
    </div>
  );
};
