import React from 'react'

interface InputIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Ícone a ser exibido dentro do campo de entrada.
   * Aceita qualquer elemento React (ex: ícones da biblioteca `react-icons`).
   */
  icon?: React.ReactNode
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
 * 
 * @exemple
 * ### Código de Exemplo de Uso
 * 
 * ```tsx
 * import React from 'react';
 * import { InputWithIcon } from './InputWithIcon';
 * import { KeyRound, Mail, User } from "lucide-react";
 * 
 * export const ExemploUsoInput = () => {
 *   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
 *     console.log('Valor do input:', event.target.value);
 *   };
 * 
 *   return (
 *     <div className="space-y-6 p-6">
 *       <h2 className="text-xl font-bold">Exemplo de Uso do Componente InputWithIcon</h2>
 * 
 *       <InputWithIcon
 *         label="Nome Completo"
 *         placeholder="Digite seu nome"
 *         value=""
 *         onChange={handleChange}
 *         icon={<User size={24} />}
 *         iconPosition="left"
 *         className="bg-white"
 *         width="w-full"
 *         enableLabelTransition
 *       />
 * 
 *       <InputWithIcon
 *         label="Email"
 *         placeholder="Digite seu email"
 *         value=""
 *         onChange={handleChange}
 *         icon={<Mail size={24} />}
 *         iconPosition="right"
 *         className="bg-gray-100"
 *         width="w-80"
 *         enableLabelTransition
 *       />
 * 
 *       <InputWithIcon
 *         label="Senha"
 *         placeholder="Digite sua senha"
 *         value=""
 *         onChange={handleChange}
 *         icon={<KeyRound size={24} />}
 *         iconPosition="left"
 *         className="bg-gray-200"
 *         width="w-64"
 *         enableLabelTransition={false}
 *       />
 *     </div>
 *   );
 * };
 * ```
 * 
 * ---
 * 
 * ### Explicação do Exemplo
 * 
 * 1. **Propriedades Utilizadas:**
 *   - `label`: Define o texto do rótulo para o campo de entrada.
 *   - `placeholder`: Define o texto que aparece enquanto o campo está vazio.
 *   - `value`: O valor atual do campo.
 *   - `onChange`: Função de callback que será executada quando o valor do campo mudar.
 *   - `icon`: Define o ícone exibido no campo (Tabler, Lucide, etc) não precisa ser SVG.
 *   - `iconPosition`: Define a posição do ícone (`left` ou `right`).
 *   - `className`: Permite adicionar classes adicionais ao campo para customização.
 *   - `width`: Define a largura do campo de entrada (ex.: `w-full`, `w-80`, etc.).
 *   - `enableLabelTransition`: Controla se o rótulo terá a transição.
 * 
 * 2. **Cenários Demonstrados:**
 *   - Campo com ícone à esquerda e transição do rótulo ativada.
 *   - Campo com ícone à direita e largura menor.
 *   - Campo com transição desativada.
 * 
 * 3. **Estilização Customizada:**
 *   - Diferentes valores para `width` e `className` foram aplicados para ilustrar a flexibilidade.
 * 
 * 4. **Ícones SVG:**
 *   - Três ícones diferentes foram usados para demonstrar como adicionar qualquer ícone ao componente.
 * 
 * 5. **OBS.:**  
 *   - Os ícones podem ser de qualquer biblioteca de ícones, Tabler, Lucide, Material, etc. 
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
