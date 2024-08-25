import { Link } from "react-router-dom"
import { Avatar } from "./BlogCards"

export const Appbar = () => {
    return <div className="border-b flex justify-between px-10 py-3">
        <Link to = {"/blogs"}>
            <div className="text-3xl font-bold text-slate-500 cursor-pointer hover:text-sky-800">
                Print
            </div>
        </Link>
        <div className=" flex cursor-pointer px-5">
            <div className="px-12 pt-1">
                <Link to={"/publish"}>
                    <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-5 focus:ring-green-300 font-medium rounded-full text-sm px-8 py-3 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">New Post</button>
                </Link>
            </div>
            <div className="pt-1">
            <div>  
                <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                </div>
            </div>
            </div>
                
        </div>
    </div>
}

