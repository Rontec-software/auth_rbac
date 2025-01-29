interface CheckBoxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  name: string;
}

export const CustomCheckBox = ({
  label,
  checked,
  onChange,
  name,
}: CheckBoxProps) => {
  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => onChange(!checked)}
    >
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-6 cursor-pointer"
      />
      <label htmlFor={name} className="cursor-pointer">
        {label}
      </label>
    </div>
  );
};
