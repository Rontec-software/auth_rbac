## **Componente: InputIcon**

O `InputIcon` é um componente reutilizável que combina um campo de entrada (`input`) com ícone e funcionalidades avançadas, como:

- Suporte a ícone (posicionado à esquerda ou à direita).
- Placeholder com transição para um `label`.
- Habilitação/desabilitação de transição.
- Totalmente personalizável via `props`.

---

### **Uso Básico**

```tsx
import InputIcon from './InputIcon';
import { HiOutlineMail } from 'react-icons/hi';

<InputIcon
  icon={<HiOutlineMail />}
  iconPosition="left"
  placeholder="Digite seu e-mail"
  label="E-mail"
  enableLabelTransition={true}
/>;
```

---

### **Propriedades**

| Propriedade           | Tipo                           | Default      | Descrição                                                                                     |
|-----------------------|--------------------------------|--------------|---------------------------------------------------------------------------------------------|
| `icon`                | `React.ReactNode`             | `-`          | Ícone a ser exibido dentro do campo de entrada. Aceita qualquer elemento React.             |
| `iconPosition`        | `'left' \| 'right'`           | `'left'`     | Determina a posição do ícone. Pode ser `'left'` (esquerda) ou `'right'` (direita).          |
| `label`               | `string`                      | `-`          | Texto exibido como `label` que substitui o placeholder ao focar ou preencher o campo.       |
| `enableLabelTransition` | `boolean`                    | `false`      | Habilita/desabilita a transição do placeholder para `label`.                                 |
| `className`           | `string`                      | `-`          | Classes adicionais do TailwindCSS para customizar o estilo do input.                        |
| `...props`            | `React.InputHTMLAttributes<HTMLInputElement>` | `-` | Propriedades padrão do elemento HTML `<input>` (como `type`, `value`, `onChange`, etc.).    |

---

### **Exemplos de Uso**

#### **1. Input com Ícone à Esquerda e Transição de Label**

```tsx
<InputIcon
  icon={<HiOutlineMail />}
  iconPosition="left"
  label="E-mail"
  placeholder="Digite seu e-mail"
  enableLabelTransition={true}
/>
```

**Resultado:**  

- Ícone aparece na esquerda.
- Placeholder transita para o `label` quando o campo está focado ou preenchido.

---

#### **2. Input com Ícone à Direita (Sem Transição de Label)**

```tsx
import { HiOutlineKey } from 'react-icons/hi';

<InputIcon
  icon={<HiOutlineKey />}
  iconPosition="right"
  placeholder="Digite sua senha"
/>
```

**Resultado:**  

- Ícone aparece na direita.
- Sem `label`, o placeholder permanece no lugar.

---

#### **3. Customização de Estilo**

```tsx
<InputIcon
  icon={<HiOutlineMail />}
  iconPosition="left"
  label="Nome Completo"
  placeholder="Digite seu nome"
  enableLabelTransition={true}
  className="bg-gray-900 text-white placeholder-gray-500"
/>
```

**Customizações:**  

- Cor de fundo (`bg-gray-900`).
- Texto branco (`text-white`).
- Placeholder com cor personalizada (`placeholder-gray-500`).

---

### **Estilos e Comportamento**

1. **Ícone:**
   - Posicionado com `absolute`.
   - Responde ao foco (`peer-focus:text-blue-500`).

2. **Transição de Label:**
   - O `label` move-se para cima ao focar ou quando o campo possui valor.
   - Controlado com classes do Tailwind: `scale-75`, `top-1`, etc.

3. **Input Base:**
   - Inclui padding condicional para acomodar o ícone (esquerda/direita).
   - Estilo dinâmico com `focus:ring-2` e `hover:border-gray-400`.

---

### **Nota para Desenvolvedores**

- **Acessibilidade:** O componente suporta acessibilidade nativa do HTML `<input>`.
- **Extendabilidade:** Você pode passar qualquer propriedade nativa do `<input>` para o componente.
- **Dependências:** Utilize bibliotecas como `react-icons` para ícones ou forneça seu próprio componente.
