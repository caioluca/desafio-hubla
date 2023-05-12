import styled from 'styled-components'

import { Logo, Input, Select, Button } from '@/components'
import { useState } from 'react'

const options = [
  { label: 'Produtor', name: 'producer' }, 
  { label: 'Afiliado', name: 'affiliate' }, 
]

function Signup({ formState, pageState }: any) {
  const [, setPage] = pageState

  return (
    <>
      <Select options={options} leftIcon={{ name: 'role' }} />
      <Input placeholder='Usuário' maxLength={30} leftIcon={{ name: 'user' }} />
      <Input type='password' placeholder='Senha' maxLength={32} leftIcon={{ name: 'password' }} />
      <Input type='password' placeholder='Confirmar Senha' maxLength={32} leftIcon={{ name: 'password' }} />

      <ButtonsContainer>
        <Button type='button' variant='secondary' children='VOLTAR' onClick={() => setPage('login')} />
        <Button type='submit' children='CRIAR' />
      </ButtonsContainer>
    </>
  )
}

function Login({ formState, pageState }: any) {
  const [, setPage] = pageState

  return (
    <>
      <Input placeholder='Usuário' maxLength={30} leftIcon={{ name: 'user' }} />
      <Input type='password' placeholder='Senha' maxLength={32} leftIcon={{ name: 'password' }} />

      <Button type='submit' children='Entrar' />

      <SignupLabel>
        Não possui uma conta? &nbsp;
        <SignupButton type='button' children='Registre-se' onClick={() => setPage('signup')} />
      </SignupLabel>
    </>
  )
}

export default function Index() {
  const formState = useState()
  const pageState = useState('login')
  const [page] = pageState

  const props = { formState, pageState }

  return (      
    <Container>
      <Form>
        <Logo size='big' style={{ marginBottom: 60 }} />

        {page === 'signup' ? <Signup {...props} /> : <Login {...props} />}
      </Form>    
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #141332;
`

const Form = styled.form`
  background-color: #1D1D41;
  border-radius: 20px;
  padding: 80px 50px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  @media screen and (max-width: 530px) {
    padding: 60px 20px;
    margin: 0 15px;
  }
`
const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SignupLabel = styled.span`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #8C89B4;
`

const SignupButton = styled.button`
  border: none;
  background: none;
  outline: none;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #FFF;
  cursor: pointer;
  text-decoration: underline;
`