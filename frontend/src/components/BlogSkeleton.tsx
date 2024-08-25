import { Appbar } from "./Appbar"


export const BlogSkeleton = () => {
    return <div>   
        <Appbar/>
        <div className="flex justify-center pt-80">
                    
            <div className="flex flex-row gap-2">
            <div className="w-4 h-4 rounded-full bg-slate-500 animate-bounce"></div>
            <div
                className="w-4 h-4 rounded-full bg-slate-500 animate-bounce [animation-delay:-.3s]"
            ></div>
            <div
                className="w-4 h-4 rounded-full bg-slate-500 animate-bounce [animation-delay:-.5s]"
            ></div>
            </div>

        </div>
    </div>
}