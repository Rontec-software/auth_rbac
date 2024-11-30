export interface InputProps {
  name: string;
  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;
  className?: string;
  type: 'text' | 'password' | 'phone';
  event: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  errorMessage?: string;
}

export default function Input(props: InputProps) {
  return (
    <div className="flex flex-col pt-4">
      <span className="text-white text-[14px] pb-1">{props.name}</span>
      <div className="flex rounded-md border-2 border-black bg-[#09090B] text-white h-[35px]">
        <div className="p-2">{props.iconBefore}</div>
        <input
          value={props.value}
          onChange={props.event}
          type={props.type}
          className={`rounded-md border-2 border-black bg-[#09090B] text-white w-full ${props.className}`}
        />
        <div className="p-2">{props.iconAfter}</div>
      </div>
      {props.errorMessage && (
        <span className="text-sm text-red-500">{props.errorMessage}</span>
      )}
    </div>
  );
}
