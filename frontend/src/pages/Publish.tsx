import axios from "axios"
import { BACKEND_URL } from "../config"
import { useState } from "react"
import { useNavigate } from "react-router-dom";



export const Publish = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const postBlog = async() => {
    // const postDetails: PostDetails = { title, description };
    const res = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
      title,
      content: description
    }, {
      headers:{
        Authorization: localStorage.getItem("token")
      }
    });
    console.log(res);
    navigate(`/blog/${res.data.id}`)
  };

    return <div className="mt-20 flex justify-center ">
    <div className="flex flex-col items-end gap-6 w-3/5">
        <div className="relative w-full min-w-[200px] ">
            <textarea
            onChange={(e) => {
              setTitle(e.target.value)
            }}
            className="peer h-full min-h-[100px] w-full resize-none border-b border-blue-gray-200 bg-transparent pt-12 pb-1.5 font-sans text-4xl font-normal text-blue-gray-900 outline outline-0 transition-all placeholder-shown:border-blue-grey-500 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-500"
            placeholder="">
            </textarea>
            <label
            className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[30px] font-bold -pb-5 leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-900 after:transition-transform after:duration-300 peer-placeholder-shown:text-5xl peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[32px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:after:scale-x-100 peer-focus:after:border-grey-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Title
            </label>
        </div>
      <div className="relative w-full min-w-[200px]">
    
    <textarea
        onChange={(e) => {
          setDescription(e.target.value)
        }}
      className="peer h-full min-h-[400px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-5 font-sans text-xl font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
      placeholder="">
      </textarea>
    <label
      className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[18px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-2xl after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-2xl peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[20px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
      Your Thougts
    </label>
    </div>
    <div className="px-5 pt-1">       
          <button onClick={postBlog} type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-5 focus:ring-green-300 font-medium rounded-full text-lg px-8 py-3 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Publish Post</button>
                
        </div>
    </div>
  </div>
}


