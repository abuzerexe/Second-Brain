import { Link } from "react-router-dom"

export default function BottomWarning({label, buttonText, to}:{label:string,buttonText:string,to:string}) {
    return <div className="py-2 text-sm flex justify-center">
      <div>
        {label}
      </div>
      <Link className="pointer underline pl-1 cursor-pointer text-blue-950" to={to}>
        {buttonText}
      </Link>
    </div>
}