'use client'

import React from 'react'
import combinarClasses from '../helpers/combinarClasses'

interface FloatingInputProps {
  type:
  | 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'datetime-local' | 'month' | 'week' | 'time' | 'color' | 'file'
  label: string
  name: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  inputText?: string
  inputTextColor?: string
  inputTextColorDark?: string
  inputBg?: string
  inputBorder?: string
  inputBorderDark?: string
  inputFocusBorder?: string
  inputFocusBorderDark?: string
  labelText?: string
  labelTextColor?: string
  labelTextColorDark?: string
  labelFocus?: string
  labelFocusDark?: string
  //   // inputPadding?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  iconTextColor?: string
  iconTextColorDark?: string
  iconFocus?: string
  iconFocusDark?: string
  idPrefix?: string
  fixedLabel?: boolean
  placeholder?: string
  placeholderText?: string
  placeholderTextColor?: string
  placeholderTextColorDark?: string
  className?: string
}

const generateId = (label: string, prefix: string = 'input') => {
  // Normaliza o prefixo, removendo espaços e caracteres inválidos, convertendo para minúsculas.
  const normalizedPrefix = prefix
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

  // Normaliza o label da mesma forma
  const normalizedLabel = label
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

  return `${normalizedPrefix}-${normalizedLabel}`

  //TODO: está ocorrendo erro de hidratação quando usa o hash
  // Gera um hash de 6 caracteres usando Math.random
  // const hash = Math.random().toString(36).substring(2, 8)

  //TODO: está ocorrendo erro de hidratação quando usa o hash
  // Retorna o ID concatenado com o hash
  // return `${normalizedPrefix}-${normalizedLabel}-${hash}`
}

const generateInputPadding = (
  icon: boolean,
  iconPosition: 'left' | 'right'
): string => {
  if (!icon) return 'px-4 pb-2.5 pt-4'
  return iconPosition === 'right'
    ? 'px-4 pb-2.5 pt-4 pr-10'
    : 'pl-11 pb-2.5 pt-4 pr-4'
}

const generateLabelPositionClasses = (
  icon: boolean,
  iconPosition: 'left' | 'right'
): string => {

  if (icon && iconPosition === 'left') {
    return 'peer-placeholder-shown:translate-x-8 peer-placeholder-shown:left-1 peer-focus:translate-x-0 peer-focus:left-3'
  }
  return 'peer-placeholder-shown:left-3 peer-focus:left-3'
}

const FloatingInput: React.FC<FloatingInputProps> = ({
  type,
  label,
  value,
  onChange,
  inputText = 'text-sm',
  inputTextColor = 'text-gray-100',
  inputTextColorDark = 'dark:text-white',
  inputBg = 'bg-transparent',
  inputBorder = 'border-gray-600',
  inputBorderDark = 'dark:border-gray-500',
  inputFocusBorder = 'focus:border-blue-600',
  inputFocusBorderDark = 'dark:focus:border-blue-500',
  labelText = 'text-sm',
  labelTextColor = 'text-gray-600',
  labelTextColorDark = 'dark:text-gray-500',
  labelFocus = 'peer-focus:text-blue-600',
  labelFocusDark = 'dark:peer-focus:text-blue-500',
  icon,
  iconTextColor = 'text-gray-600',
  iconTextColorDark = 'dark:text-gray-500',
  iconPosition = 'right',
  iconFocus = 'peer-focus:text-blue-600',
  iconFocusDark = 'dark:peer-focus:text-blue-500',
  idPrefix = 'input',
  fixedLabel = false,
  placeholder,
  placeholderText = 'placeholder:text-sm',
  placeholderTextColor = 'placeholder:text-gray-600',
  placeholderTextColorDark = 'dark:placeholder:text-gray-500',
  className = '',
  ...props
}) => {
  const id = generateId(label, idPrefix)

  if (fixedLabel && !placeholder) {
    console.warn(
      '\x1b[33m%s\x1b[0m',
      `\n⚠️ Aviso:\nPlaceholder não foi fornecido para o\x1b[34m input\x1b[33m com\x1b[36m fixedLabel:${label}\x1b[33m. \nDefina\x1b[36m placeholder={''}\x1b[33m para melhorar a usabilidade.\n`
    )
  }

  const inputPaddingValue = generateInputPadding(!!icon, iconPosition)
  const labelPositionClasses = generateLabelPositionClasses(
    !!icon,
    iconPosition
  )

  const inputClasses = combinarClasses(
    'block',
    inputPaddingValue,
    'w-full',
    inputText,
    inputTextColor,
    inputBg,
    'rounded-xl',
    'border',
    inputBorder,
    'appearance-none',
    inputTextColorDark,
    inputBorderDark,
    inputFocusBorderDark,
    'focus:outline-none',
    'focus:ring-1',
    inputFocusBorder,
    placeholderText,
    placeholderTextColor,
    placeholderTextColorDark,
    className,
    'peer'
  )

  const labelClasses = combinarClasses([
    'absolute',
    labelPositionClasses,
    labelText,
    labelTextColor,
    labelTextColorDark,
    'duration-300',
    'transform',
    '-translate-y-4',
    'scale-75',
    'top-2',
    'origin-[0]',
    'px-2',
    'bg-inherit',
    'peer-focus:px-2',
    'peer-focus:rounded-lg',
    labelFocus,
    labelFocusDark,
    'peer-placeholder-shown:scale-100',
    'peer-placeholder-shown:-translate-y-1/2',
    'peer-placeholder-shown:top-1/2',
    'peer-focus:top-2',
    'peer-focus:scale-75',
    'peer-focus:-translate-y-4',
    'rtl:peer-focus:translate-x-1/4',
    'rtl:peer-focus:left-auto',
    'start-3',
    className,
    'peer',
  ])

  const labelClassesFixed = combinarClasses([
    'absolute',
    'left-3',
    '-translate-y-6',
    labelText,
    labelTextColor,
    labelTextColorDark,
    className,
    'peer',
  ])

  const iconClasses = combinarClasses([
    'absolute',
    'inset-y-0',
    iconPosition === 'left' ? 'left-3' : 'right-3',
    'flex',
    'items-center',
    'z-10',
    'pointer-events-none',
    iconTextColor,
    iconTextColorDark,
    iconFocus,
    iconFocusDark,
    className,
    'peer',
  ])

  return (
    <div className={`relative bg-inherit ${fixedLabel ? 'mt-4' : ''}`}>
      {fixedLabel && (
        <label htmlFor={id} className={labelClassesFixed}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={inputClasses}
        placeholder={
          fixedLabel ? placeholder || 'Adicione a propriedade placeholder!' : ''
        }
        {...props}
      />
      {icon && <div className={iconClasses}>{icon}</div>}
      {!fixedLabel && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}
    </div>
  )
}

export default FloatingInput
