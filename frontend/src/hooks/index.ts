import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";


export interface Blog{
    content : string,
    title: string,
    id: string,
    author:{
      name: string
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true); // Initially set loading to true
    const [blog, setBlog] = useState<Blog | undefined>();
  
    useEffect(() => {
      const fetchBlog = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
              Authorization: localStorage.getItem("token") || "",
            },
          });
  
          setBlog(response.data.post);
        } catch (error) {
          console.error("Error fetching blog:", error);
        } finally {
          setLoading(false); // Set loading to false after fetching completes
        }
      };
  
      if (id) {
        fetchBlog();
      }
    }, [id]); // Include id as a dependency
  
    return {
      loading,
      blog,
    };
  };

export const useBlogs = () =>{
    const [loding, setLoading] = useState(false);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.content);
                setLoading(true);
            })
      }, []);
    console.log(blogs)
    return {
        loding,
        blogs
    }
}