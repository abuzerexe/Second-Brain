import { ReactElement } from "react";

interface sidebarItemProps{
    title : string;
    Icon : ReactElement

}

export default function SidebarItem({title, Icon} :sidebarItemProps){

    return(
        <div  className="flex  items-center text-gray-800 py-2 cursor-pointer hover:bg-gray-200 rounded max-w-48 pl-4 transition-all duration-150" >
            <div className="pr-3 ">
                {Icon}
            </div>
            <div className="text-xl" >
                {title}
            </div>
        </div>
    )
}