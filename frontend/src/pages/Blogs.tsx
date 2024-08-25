import { Appbar } from "../components/Appbar";
import { BlogCards } from "../components/BlogCards";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";



export const Blogs = () => {
  const {loding, blogs} = useBlogs();

  if(loding == false){
    return <div>
      <BlogSkeleton/>
    </div>
  }
  return (
    <div>
      <Appbar/>
      <div className="flex justify-center">
        <div >
          {blogs.map(blog => <BlogCards
            id = {blog.id}
            authorName={blog.author.name || "Anonymous"}
            title= {blog.title}
            content = {blog.content}
            publishDate={"today -- This is not correct time :)"}
          />)}
          
        </div>
      </div>
    </div>
  );
};
