
interface inputProps {
    label : string;
    placeholder?:string;
    type : string;
    onChange ?: (e:any)=>void
    
}

export default function InputBox({label, placeholder, onChange, type}:inputProps) {
    return <div>
      <div className="text-md font-medium text-left py-2">
        {label}
      </div>
      <input type={type} onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-300" />
    </div>
}