import BrainIcon from "../icons/BrainIcon";
import DocumentIcon from "../icons/DocumentIcon";
import LinkIcon from "../icons/LinkIcon";
import TagsIcon from "../icons/TagsIcon";
import XIcon from "../icons/XIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import SidebarItem from "./SidebarItem";

export default function Sidebar(){

    return(
        <div className="bg-white fixed left-0 top-0  h-screen w-66 border-r border-gray-300 pl-2">
            
            <div className="flex text-2xl pt-4 items-center">
                <div className="pr-2 text-[#5046e4]">

                <BrainIcon/>
                </div>
                <div className="font-bold font-poppins">

                Second Brain
                </div>
            </div>
            <div className="pl-5 pt-9 font-poppins">

            <SidebarItem title="Videos" Icon={<YoutubeIcon h={23} w={23}/>}/>
            <SidebarItem title="Tweets/X" Icon={<XIcon h={23} w={23}/>}/>
            <SidebarItem title="Documents" Icon={<DocumentIcon h={23} w={23} />}/>
            <SidebarItem title="Links" Icon={<LinkIcon h={23} w={23}/>}/>
            <SidebarItem title="Tags" Icon={<TagsIcon h={23} w={23} />}/>
            </div>
        </div>
    )
}