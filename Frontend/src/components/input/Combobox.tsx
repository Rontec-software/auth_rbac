import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';

import clsx from 'clsx';
import { Check, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export interface Option {
  value: number | string;
  label: string;
}

interface CustomComboboxProps {
  options: Option[];
  value?: Option | null;
  defaultValue?: Option;
  placeholder?: string;
  onChange?: (selected: Option) => void;
  className?: string;
  inputClassName?: string;
  optionClassName?: string;
  renderOption?: (option: Option, selected: boolean) => React.ReactNode;
}

export default function CustomCombobox({
  options,
  value,
  defaultValue,
  placeholder = 'Selecione a opção...',
  onChange,
  className,
  inputClassName,
  optionClassName,
  renderOption,
}: CustomComboboxProps) {
  const [query, setQuery] = useState('');
  const [internalValue, setInternalValue] = useState(defaultValue || null);

  const selectedValue = value || internalValue;

  const handleSelection = (selected: Option) => {
    if (!value) setInternalValue(selected);
    onChange?.(selected);
  };

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) =>
          option.label.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className={clsx('relative w-full', className)}>
      <Combobox
        value={selectedValue}
        onChange={(selected: Option) => handleSelection(selected)}
        onClose={() => setQuery('')}
      >
        <div className="relative">
          <ComboboxInput
            className={clsx(
              'w-full rounded-lg border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none',
              'bg-white text-gray-900',
              inputClassName
            )}
            displayValue={(option: Option) => option?.label || ''}
            placeholder={placeholder}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center px-2">
            <ChevronDown className="h-5 w-5 text-gray-500" />
          </ComboboxButton>
        </div>

        <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {filteredOptions.map((option) => (
            <ComboboxOption
              key={option.value}
              value={option}
              className={({ active, selected }) =>
                clsx(
                  'cursor-pointer select-none px-4 py-2',
                  active ? 'bg-blue-500 text-white' : 'text-gray-900',
                  selected && 'font-semibold',
                  optionClassName
                )
              }
            >
              {({ selected }) => {
                if (renderOption) {
                  return renderOption(option, selected) as React.ReactElement;
                }
                return (
                  <div className="flex items-center">
                    {selected && (
                      <Check className="mr-2 h-4 w-4 text-blue-500" />
                    )}
                    {option.label}
                  </div>
                );
              }}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
