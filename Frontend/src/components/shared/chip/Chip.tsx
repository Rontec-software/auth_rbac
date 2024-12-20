import { HTMLAttributes } from 'react';

type color =
  | 'bg-blue-500'
  | 'bg-green-500'
  | 'bg-red-500'
  | 'bg-yellow-500'
  | 'bg-gray-500';

interface IChipProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  color?: color;
}

export const Chip = ({ label, color = 'bg-blue-500', ...rest }: IChipProps) => {
  return (
    <div
      className={`inline-flex items-center ${color}  text-white rounded-full px-3  text-sm font-semibold  ${
        rest.className || ''
      }`}
      {...rest}
    >
      {label}
    </div>
  );
};
