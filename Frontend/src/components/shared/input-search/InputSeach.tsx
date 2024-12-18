import Image from 'next/image';
import { DetailedHTMLProps, FormEvent, InputHTMLAttributes } from 'react';
import Search from '../../../../public/search.svg';

type IInputSearch = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  name: string;
  placeholder: string;
  label: string;
  handleSearch: (e: FormEvent<HTMLFormElement>) => void;
  handleReset: () => void;
};

export const InputSearch = ({
  name,
  placeholder,
  label,
  handleSearch,
  handleReset,
  ...rest
}: IInputSearch) => {
  return (
    <form onSubmit={handleSearch}>
      <div className="flex items-center bg-background-janela-principal text-white rounded-lg px-4 w-full">
        <label htmlFor={`search ${name}`} className="flex-none text-sm mr-2">
          {label}
        </label>
        <div className="flex items-center border border-border-color rounded-lg w-full m-1 bg-background">
          <button
            type="submit"
            className="flex items-center justify-center px-2"
          >
            <Image src={Search} alt="Buscar" width={20} height={20} />
          </button>
          <input
            type="text"
            id={`search ${name}`}
            name={name}
            placeholder={placeholder}
            className="flex-grow bg-transparent border-none outline-none text-sm placeholder-gray-400 px-2"
            {...rest}
          />
          <button
            type="reset"
            onClick={handleReset}
            className="flex items-center justify-center px-2"
          >
            x
          </button>
        </div>
      </div>
    </form>
  );
};
