import DeleteIcon from "../icons/DeleteIcon"
import DocumentIcon from "../icons/DocumentIcon"
import ShareBrain from "../icons/ShareBrainIcon"
import XIcon from "../icons/XIcon"
import YoutubeIcon from "../icons/YoutubeIcon"
import YouTube from 'react-youtube';
import {  TwitterTweetEmbed } from 'react-twitter-embed';

interface cardProps{
    title ?: string,
    type ?: string,
    id ?: string
}

function TypeIcon({type}:cardProps){

   if(type === "yt"){
    return <YoutubeIcon h={26} w={26}/>
   }
   if(type === "x"){
    return <XIcon h={26} w={26}/>
   }
   if(type === "doc"){
    return <DocumentIcon h={26} w={26}/>
   }
}

const opts = {
    height: '300',
    width: '100%'
  };
  
function Embeding({type,id}:cardProps){

        if(type === "yt"){
           return <YouTube videoId={id} opts={opts} />
        }
       if(type === "x"){
        return <TwitterTweetEmbed tweetId={id as string}/>
       }
       if(type === "doc"){
        return <iframe src={id} className="w-full h-72 " title="Document Viewer"></iframe>
       }
}



export default function Card({title,type,id}:cardProps){

    return(
        <div className=" max-w-72  p-4 border border-gray-200 bg-white rounded-lg shadow-md mb-6">
            <div className="flex justify-between"> 
                <div className="flex justify-center items-center">
                    <div className="pr-2 ">
                    {<TypeIcon type={type}/>}
                    </div>
                    <h1 className="font-medium ">
                    {title}
                    </h1>
                </div>
                <div className="flex justify-center items-center text-gray-500">
                    <div className="pr-2">
                    <ShareBrain/>
                    </div>
                    <DeleteIcon/>
                </div>
            </div>
            <div className="pt-4 ">
                <Embeding type={type} id={id}/>
            </div>
        </div>
    )
}