import React from 'react'

interface InputIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Ícone a ser exibido dentro do campo de entrada.
   * Aceita qualquer elemento React (ex: ícones da biblioteca `react-icons`).
   */
  icon: React.ReactNode
  /**
   * Define a posição do ícone dentro do input.
   * Pode ser `left` (esquerda) ou `right` (direita).
   * @default 'left'
   */
  iconPosition?: 'left' | 'right'
  /**
   * Texto exibido como `label` que substitui o placeholder ao focar ou preencher o campo.
   * Caso não seja fornecido, apenas o placeholder será exibido.
   */
  label?: string
  /**
   * Habilita ou desabilita a transição do placeholder para o `label`.
   * @default false
   */
  enableLabelTransition?: boolean
  /**
   * Classes adicionais do TailwindCSS para personalizar o estilo do input.
   */
  className?: string
}

/**
 * Componente reutilizável de campo de entrada com ícone.
 * Suporte para ícone posicionado à esquerda ou à direita,
 * transição de placeholder para `label`, e personalização via TailwindCSS.
 *
 * @param {InputIconProps} props Propriedades do componente.
 * @returns JSX.Element
 */
const InputIcon: React.FC<InputIconProps> = ({
  icon,
  iconPosition = 'left',
  label,
  width,
  enableLabelTransition = false,
  className = '',
  placeholder,
  ...props
}) => {
  return (
    <div className={`relative ${width}`}>
      <div
        className={`absolute inset-y-0 flex items-center ${
          iconPosition === 'left' ? 'left-3' : 'right-3'
        }`}
      >
        {icon}
      </div>
      <input
        className={`peer w-full border border-gray-500 rounded-md px-3 py-2 text-gray-700 
          outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          iconPosition === 'left' ? 'pl-10' : 'pr-10'
        } ${className}`}
        placeholder={enableLabelTransition && label ? '' : placeholder}
        {...props}
      />
      {enableLabelTransition && label && (
        <label
          className={`absolute ${
            iconPosition === 'left' ? 'pl-8' : 'pl-3'
          } left-2 top-0 text-gray-200 text-lg scale-100 transform transition-all peer-placeholder-shown:scale-100 
           peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:text-base peer-focus:scale-75 
           peer-focus:-translate-y-6 peer-focus:pl-1`
          }
        >
          {label}
        </label>
      )}
    </div>
  )
}

export default InputIcon
