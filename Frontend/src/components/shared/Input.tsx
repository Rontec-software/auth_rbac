export interface InputProps {
    name: string;
    icon: React.ReactNode;
    className?: string;
    type: "text" | "password" | "phone";
    event: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: InputProps) {
    return (
        <div className="flex flex-col pt-2">
            <span className="text-white text-[14px] pb-1">{props.name}</span>
            <div className="flex rounded-md border-2 border-black bg-black text-white h-[43px]">
                <div className="p-2">{props.icon}</div>
                <input
                    onChange={props.event}
                    type={props.type}
                    className={`rounded-md border-2 border-black bg-black text-white w-full ${props.className}`}
                />
            </div>
        </div>
    )
}
