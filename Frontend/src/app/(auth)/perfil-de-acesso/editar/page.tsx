'use client'

import FloatingInput from '@/components/input/FloatingInput'
import { FileText, IdCard, UserRoundPen } from 'lucide-react'
import React, { useState } from 'react'

export default function EditarPerfil() {
  // Estado para o formulário
  const [formData, setFormData] = useState({
    id: '',
    nome: '',
    descricao: '',
  })

  // Estado para o checkbox
  const [checkboxes, setCheckboxes] = useState({
    administrador: false,
    gerente: false,
    usuario: false,
    fornecedor: false,
    loja: false,
    cliente: false,
  })

  // Manipulador para inputs de texto
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Manipulador para checkboxes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setCheckboxes((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const isFormValid = () => {
    // Verifica se pelo menos um checkbox está marcado
    const isCheckboxChecked = Object.values(checkboxes).some(
      (checked) => checked
    )

    // Verifica se o ID é maior que 3 caracteres
    const isIdValid = formData.id.trim().length > 3

    // Verifica se o Nome é maior que 3 caracteres
    const isNameValid = formData.nome.trim().length > 3

    // Verifica se a Descrição é maior que 3 caracteres
    const isDescriptionValid = formData.descricao.trim().length > 3

    // Ambos os critérios devem ser atendidos
    return isIdValid && isNameValid && isDescriptionValid && isCheckboxChecked
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
      ...checkboxes,
    }

    alert('Formulário enviado com sucesso!')
    console.log('Dados do Formulário:', dados)

    // Limpa o formulário e os checkboxes
    setFormData({ id: '', nome: '', descricao: '' })
    setCheckboxes({
      administrador: false,
      gerente: false,
      usuario: false,
      fornecedor: false,
      loja: false,
      cliente: false,
    })
  }

  const classCheckbox = 'w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
  const classSpanCheckbox = 'text-gray-500 ml-2'
  const classLabelCheckbox = 'flex justify-start items-center'

  return (
    <div className="flex w-11/12 flex-col gap-4 py-2 bg-inherit">
      <div className="flex flex-col bg-inherit  gap-3">
        <form className="flex flex-1 flex-col bg-inherit gap-3 mx-10" action="">
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

      <div className="flex flex-col py-2 rounded-lg bg-gray-800">
        <h1 className="font-semibold ml-10">Perfis</h1>
      </div>

      <div className="flex justify-between gap-3 mx-10">
        <div className="flex flex-col gap-3 pb-5">
          <label htmlFor="administrador" className={classLabelCheckbox}>
            <input
              type="checkbox"
              className={classCheckbox}
              name={'administrador'}
              checked={checkboxes.administrador}
              onChange={handleCheckboxChange}
            />
            <span className={classSpanCheckbox}>Administrador</span>
          </label>

          <label htmlFor="fornecedor" className={classLabelCheckbox}>
            <input
              type="checkbox"
              className={classCheckbox}
              name={'fornecedor'}
              checked={checkboxes.fornecedor}
              onChange={handleCheckboxChange}
            />
            <span className={classSpanCheckbox}>Fornecedor</span>
          </label>
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="gerente" className={classLabelCheckbox}>
            <input
              type="checkbox"
              className={classCheckbox}
              name={'gerente'}
              checked={checkboxes.gerente}
              onChange={handleCheckboxChange}
            />
            <span className={classSpanCheckbox}>Gerente</span>
          </label>

          <label htmlFor="loja" className={classLabelCheckbox}>
            <input
              type="checkbox"
              className={classCheckbox}
              name={'loja'}
              checked={checkboxes.loja}
              onChange={handleCheckboxChange}
            />
            <span className={classSpanCheckbox}>Loja</span>
          </label>
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="usuario" className={classLabelCheckbox}>
            <input
              type="checkbox"
              className={classCheckbox}
              name={'usuario'}
              checked={checkboxes.usuario}
              onChange={handleCheckboxChange}
            />
            <span className={classSpanCheckbox}>Usuário</span>
          </label>

          <label htmlFor="cliente" className={classLabelCheckbox}>
            <input
              type="checkbox"
              className={classCheckbox}
              name={'cliente'}
              checked={checkboxes.cliente}
              onChange={handleCheckboxChange}
            />
            <span className={classSpanCheckbox}>Cliente</span>
          </label>
        </div>
      </div>

      <div className="flex justify-center gap-6 lg:justify-end lg:mr-10">
        <button
          onClick={handleSubmit}
          type="submit"
          className={`py-2 w-1/2 rounded-md lg:w-fit lg:px-5 ${
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
          className="bg-red-500 py-2 w-1/2 rounded-md lg:w-fit lg:px-5"
          onClick={() => {
            setFormData({ id: '', nome: '', descricao: '' })
            setCheckboxes({
              administrador: false,
              gerente: false,
              usuario: false,
              fornecedor: false,
              loja: false,
              cliente: false,
            })
          }}
        >
          Limpar
        </button>
      </div>
    </div>
  )
}
