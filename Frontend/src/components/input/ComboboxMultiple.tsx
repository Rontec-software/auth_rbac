import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import clsx from 'clsx';
import { Check, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export interface Option {
  value: number | string;
  label: string;
}

interface CustomListboxProps {
  options: Option[];
  value?: Option[];
  defaultValue?: Option[];
  placeholder?: string;
  onChange?: (selected: Option[]) => void;
  className?: string;
  buttonClassName?: string;
  optionClassName?: string;
}

export default function ComboboxMultiple({
  options,
  value,
  defaultValue = [],
  placeholder = 'Selecione as opções...',
  onChange,
  className,
  buttonClassName,
  optionClassName,
}: CustomListboxProps) {
  const [internalValue, setInternalValue] = useState<Option[]>(
    value || defaultValue
  );

  const selectedValues = value ?? internalValue;

  const handleSelection = (selected: Option[]) => {
    if (!value) setInternalValue(selected);
    onChange?.(selected);
  };

  const renderSelectedValues = () => {
    const limit = 2;
    if (selectedValues.length === 0) {
      return placeholder;
    }

    const displayed = selectedValues
      .slice(0, limit)
      .map((option) => option.label);
    const remainingCount = selectedValues.length - limit;

    return remainingCount > 0
      ? `${displayed.join(', ')} e mais ${remainingCount}`
      : displayed.join(', ');
  };

  return (
    <div className={clsx('w-full, h-[35px]', className)}>
      <label className="text-[14px]">{placeholder}</label>
      <Listbox
        value={selectedValues}
        onChange={handleSelection}
        multiple
        by={'value'}
      >
        <div className="relative">
          <ListboxButton
            className={clsx(
              'relative w-full truncate rounded-md border-2 border-black bg-[#09090B] py-2 pl-3 pr-10 text-sm text-gray-50 focus:outline-none',
              buttonClassName
            )}
            title={selectedValues.map((option) => option.label).join(', ')}
          >
            {renderSelectedValues()}
            <span className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </span>
          </ListboxButton>

          <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-800 py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {options.map((option) => (
              <ListboxOption
                key={option.value}
                value={option}
                className={({ active, selected }) =>
                  clsx(
                    'cursor-pointer select-none px-1 py-1',
                    active && 'bg-gray-700',
                    selected && 'bg-black',
                    optionClassName
                  )
                }
              >
                {({ selected }) => (
                  <div className="flex items-center">
                    {option.label}
                    {selected && <Check className="ml-1 h-4 w-4 text-white" />}
                  </div>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
}
