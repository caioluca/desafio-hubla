import { ChangeEvent } from 'react'
import styled from 'styled-components'

import { Button, Select, Input } from '@/components'
import { IOption } from '@/types'
import { useActions, useStore } from '@/hooks'

const options: Array<IOption> = [
  { label: 'Administrador', name: 'admin' }, 
  { label: 'Produtor', name: 'producer' }, 
  { label: 'Afiliado', name: 'affiliate' }, 
]

export function Signup() {
  const { form } = useStore()
  const { setForm, setPage } = useActions()

  function handleSelectChange(option: IOption) {
    setForm({ ...form, role: option.name })
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { target: { name, value } } = event

    setForm({ ...form, [name]: value })
  }

  function handleBackButtonClick() {
    setForm({})
    setPage('login')
  }

	return (
		<>
			<Role onChange={handleSelectChange} />

			<User onChange={handleInputChange} />
			<Password onChange={handleInputChange} />
			<ConfirmPassword onChange={handleInputChange} />

			<ButtonsContainer>
				<Button
					type='button' 
					variant='secondary' 
					children='VOLTAR' 
					onClick={handleBackButtonClick}
				/>
				<Button
					type='submit' 
					children='CRIAR'
				/>
			</ButtonsContainer>
		</>
	)
}

const Role = styled(Select).attrs({
  options: options, 
  leftIcon: { name: 'role' }
})``

const User = styled(Input).attrs({
  placeholder: 'Usuário',
  name: 'username',
  maxLength: 30,
  leftIcon: { name: 'user' }
})``

const Password = styled(Input).attrs({
  type: 'password', 
  placeholder: 'Senha',
  name: 'password',
  maxLength: 32,
  leftIcon: { name: 'password' }
})``

const ConfirmPassword = styled(Input).attrs({
  type: 'password', 
  placeholder: 'Confirmar Senha',
  name: 'confirmPassword',
  maxLength: 32,
  leftIcon: { name: 'password' }
})``

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`