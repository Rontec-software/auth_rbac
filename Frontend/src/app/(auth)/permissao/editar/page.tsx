'use client'

import FloatingInput from '@/components/input/FloatingInput'
import { FileText, IdCard, UserRoundPen } from 'lucide-react'
import { useState } from 'react'

export default function EditarPermissao() {
  // Estado para o formulário
  const [formData, setFormData] = useState({
    id: '',
    nome: '',
    descricao: '',
  })

  // Manipulador para inputs de texto
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const isFormValid = () => {

    // Verifica se o ID é maior que 3 caracteres
    const isIdValid = formData.id.trim().length > 3

    // Verifica se o Nome é maior que 3 caracteres
    const isNameValid = formData.nome.trim().length > 3

    // Verifica se a Descrição é maior que 3 caracteres
    const isDescriptionValid = formData.descricao.trim().length > 3

    // Ambos os critérios devem ser atendidos
    return isIdValid && isNameValid && isDescriptionValid
  }

  // Função para lidar com o envio
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid()) {
      alert('Preencha todos os campos obrigatórios!')
      return
    }

    // Processa os dados do formulário
    const dados = {
      ...formData,
    }

    alert('Formulário enviado com sucesso!')
    console.log('Dados do Formulário:', dados)

    // Limpa o formulário e os checkboxes
    setFormData({ id: '', nome: '', descricao: '' })
  }

  const divSpanClass = 'flex flex-wrap justify-around gap-y-4 mx-10 my-5'
  const spanClass = 'flex w-fit py-0.5 px-7 rounded-full border border-blue-600'

  return (
    <div className="flex w-11/12 flex-col rounded-lg gap-6 py-10 bg-gray-950">
      <div className="flex flex-col bg-inherit">
        <form className="flex flex-1 flex-col bg-inherit gap-4 mx-10" action="">
          <FloatingInput
            type={'text'}
            label={'ID'}
            icon={<IdCard size={20} />}
            iconPosition={'left'}
            name={'id'}
            value={formData.id}
            onChange={handleInputChange}
          />
          <FloatingInput
            type={'text'}
            label={'Nome'}
            icon={<UserRoundPen size={20} />}
            iconPosition={'left'}
            name={'nome'}
            value={formData.nome}
            onChange={handleInputChange}
          />
          <FloatingInput
            type={'text'}
            label={'Descrição'}
            icon={<FileText size={20} />}
            iconPosition="left"
            name={'descricao'}
            value={formData.descricao}
            onChange={handleInputChange}
          />
        </form>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col w-1/2">
          <div className="flex py-2 rounded-tl-lg rounded-tr-lg bg-gray-800">
            <h1 className="font-semibold ml-10">Permissões Disponíveis</h1>
          </div>

          <div className="flex bg-transparent border border-gray-800">
            <div className={divSpanClass}>
              <span className={spanClass}>
                Incluir-a
              </span>
              <span className={spanClass}>
                Incluir-a
              </span>
              <span className={spanClass}>
                Incluir-a
              </span>
              <span className={spanClass}>
                Incluir-a
              </span>
              <span className={spanClass}>
                Incluir-a
              </span>
              <span className={spanClass}>
                Incluir-a
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-1/2">
          <div className="flex py-2 rounded-tl-lg rounded-tr-lg bg-gray-800">
            <h1 className="font-semibold ml-10">Permissões Selecionados</h1>
          </div>

          <div className="flex bg-transparent border border-gray-800">
            <div className={divSpanClass}>
              <span className={spanClass}>
                Incluir-a
              </span>
              <span className={spanClass}>
                Incluir-a
              </span>
              <span className={spanClass}>
                Incluir-a
              </span>
              <span className={spanClass}>
                Incluir-a
              </span>
              <span className={spanClass}>
                Incluir-a
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-6 mr-10">
        <button
          onClick={handleSubmit}
          type="submit"
          className={`py-2 px-5 rounded-md ${
            isFormValid()
              ? 'bg-green-600 hover:bg-green-400'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          disabled={!isFormValid()}
        >
          Salvar
        </button>
        <button
          type="reset"
          className="bg-red-500 py-2 px-5 rounded-md"
          onClick={() => {
            setFormData({ id: '', nome: '', descricao: '' })
          }}
        >
          Limpar
        </button>
      </div>
    </div>
  )
}
