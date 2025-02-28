import BrainIcon from "../icons/BrainIcon";

export default function Appbar(){


    return <div className="shadow-lg h-16 flex justify-between bg-gradient-to-r from-[#0F172A] to-[#37309b] transition-colors duration-300">
    <div className=" font-['Poppins'] flex flex-col justify-center  ml-5 text-2xl font-bold ">
            <div className="flex text-2xl pt-4 items-center">
                <div className="pr-2 text-[#5046e4]">

                <BrainIcon/>
                </div>
                <div className="font-bold font-poppins text-white">

                Second Brain
                </div>
            </div>
    </div>
    
</div>
    
}