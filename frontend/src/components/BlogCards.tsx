import { Link } from "react-router-dom"


interface blogCardInputs {
    id: string
    authorName: string,
    title: string,
    content: string,
    publishDate: string
}
export const BlogCards = ({
    id,
    authorName,
    title,
    content,
    publishDate
}: blogCardInputs) => {
    return <div className=" border-b border-spacing-x-16 border-slate-200 px-20 py-8 w-screen max-w-screen-xl">
        
        <div className="flex text-xl ">

            <div className="flex  flex-col pl-1 pr-3 cursor-pointer">
            <Avatar name={authorName}/>
            </div>
            <div className="pr-2 cursor-pointer">
                {authorName}
            </div>
            <div className="flex justify-center flex-col text-xs text-slate-500">
                &#9679;
            </div>
            <div className="font-extralight pl-2 text-slate-500">
                {publishDate}
            </div>
        </div>
        <Link to={`/blog/${id}`}>
            <div className="font-bold text-3xl pt-9 pb-4 cursor-pointer">
                {title}
            </div>
            <div className="font-medium text-xl cursor-pointer">
                {content.slice(0, 400) + " ..."}
            </div>
        </Link>
        <div className="pt-8">
            {Math.ceil(content.length / 100)} {Math.ceil(content.length / 100) === 1 ? "minute read" : "minutes read"}
        </div>

    </div>
}


export function Avatar({name}: {name: string}){
    return <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="font-sm text-gray-600 dark:text-gray-300">{name[0]}</span>
    </div>
}