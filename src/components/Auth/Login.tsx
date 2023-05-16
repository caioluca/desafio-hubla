import { ChangeEvent } from 'react'
import styled from 'styled-components'

import { Button, Input } from '@/components'
import { useActions, useStore } from '@/hooks'

export function Login() {
  const { form } = useStore()
  const { setForm, setPage } = useActions()

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { target: { name, value } } = event

    setForm({ ...form, [name]: value })
  }

  function handleSignupClick() {
    setForm({})
    setPage('signup')
  }

  return (
    <>
      <User onChange={handleInputChange}/>
      <Password onChange={handleInputChange} />

      <Button type='submit' children='Entrar' />

      <SignupLabel>
        Não possui uma conta? &nbsp;
        <SignupButton 
          type='button' 
          children='Registre-se' 
          onClick={handleSignupClick}
        />
      </SignupLabel>
    </>
  )
}

const SignupLabel = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #8C89B4;
`

const SignupButton = styled.button`
  border: none;
  background: none;
  outline: none;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #FFF;
  cursor: pointer;
  text-decoration: underline;
`

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