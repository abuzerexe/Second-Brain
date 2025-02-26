import CloseIcon from "../icons/CloseIcon";
import Button from "./Button";
import InputBox from "./InputBox";

interface AddContentModalProps {
    open: boolean;
    onClose: () => void;
  }

export default function AddContentModal({open, onClose}:AddContentModalProps) {
    return (
        <div>
            <div 
                className={`w-screen h-screen bg-slate-500/60 left-0 top-0 fixed flex justify-center transition-all duration-300 ${
                    open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                }`}
            >
                <div className="flex flex-col justify-center">
                    <div className="bg-white p-4 opacity-100 rounded-md h-82 w-md">
                        <div onClick={() => onClose()} className="flex justify-end cursor-pointer">
                            <CloseIcon />
                        </div>
                        <InputBox label={"Title"} placeholder="My Resume" type="text" />
                        <InputBox label={"Type"} placeholder="Document" type="text" />
                        <InputBox label={"Link"} placeholder="www.docs.google.com" type="text" />
                        <div className="flex justify-center pt-4">
                        <Button variant="primary" text="Submit" />
                        </div>
                    </div>
                </div>   
            </div>
        </div>
    )
}