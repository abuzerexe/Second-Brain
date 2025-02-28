import { ReactElement } from "react";

interface buttonProps{
    variant : "primary" | "secondary";
    text : string;
    startIcon ?: ReactElement;
    onClick ?: ()=>void

}

const variantClass = {
    primary : "bg-[#5046e4] text-white hover:bg-[#453CC9] ",
    secondary : "bg-[#d3dbf7] text-[#463bcb] hover:bg-[#C5CFFF]"
}

const defaultTheme = "px-4 py-2 rounded-md flex justify-center items-center cursor-pointer transition-all duration-150"

export default function Button({variant,text,startIcon,onClick} :buttonProps){

    return(
        
        <button onClick={onClick} className =  {variantClass[variant] + " "+ defaultTheme}>
            <div className="pr-2  ">
            {startIcon}
            </div>
            {text}
            </button>
    )
}