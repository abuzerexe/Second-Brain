import { ReactElement } from "react";

interface buttonProps{
    variant : "primary" | "secondary";
    text : string;
    startIcon : ReactElement

}

const variantClass = {
    primary : "bg-[#5046e4] text-white hover:bg-[#453CC9] ",
    secondary : "bg-[#e0e7ff] text-[#463bcb] hover:bg-[#C5CFFF]"
}

const defaultTheme = "px-4 py-2 rounded-md flex justify-center items-center "

export default function Button({variant,text,startIcon} :buttonProps){

    return(
        
        <button className =  {variantClass[variant] + " "+ defaultTheme}>
            <div className="pr-2">
            {startIcon}
            </div>
            {text}
            </button>
    )
}