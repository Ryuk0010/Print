import { Blog } from "../hooks";

export const FullBlog = ({blog}: {blog: Blog}) => {
    return (
        <div className="grid grid-cols-12 px-44 w-full pt-16">
          <div className="col-span-9">
            <div className="text-6xl font-extrabold pb-20">
                {blog.title}
            </div>
            <div className="text-2xl font-normal">
                {blog.content}
            </div>
          </div>
          <div className="col-span-3">
            <div className="text-xl pb-4 text-slate-500 font-semibold">
                Know the Author
            </div>
            <div className="flex">
                <div className="text-3xl text-slate-300 pl-8">
                &#9679;
                </div>
                <div className="text-4xl font-bold pl-3 pt-2">
                    <div className="flex -mt-2">
                        <div className="-mt-2 -pl-3">
                            <Avatar name={blog.author.name}/>
                        </div>
                        <div className="pl-1">
                            {blog.author.name}
                        </div>
                    </div>
                    <div className="text-2xl font-medium text-slate-400 pt-4">
                        Author's details are not updated yet
                    </div>
                </div>
            </div>
          </div>
        </div>
    );
      
}

function Avatar({name}: {name: string}){
    return <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 -pt-1">
    <span className="text-sm text-gray-600 dark:text-gray-300">{name[0]}</span>
    </div>
}