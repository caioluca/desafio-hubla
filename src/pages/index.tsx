import { ChangeEvent, FormEvent, useState } from 'react'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { withIronSessionSsr } from 'iron-session/next'
import styled from 'styled-components'

import { sessionOptions } from '@/lib'
import { Logo, Input, Select, Button } from '@/components'
import { IOption } from '@/types'
import { useActions, useStore } from '@/hooks'

const options = [
  { label: 'Administrador', name: 'admin' }, 
  { label: 'Produtor', name: 'producer' }, 
  { label: 'Afiliado', name: 'affiliate' }, 
]

function Signup({ formState, pageState }: any) {
  const [form, setForm] = formState
  const [, setPage] = pageState

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

function Login({ formState, pageState }: any) {
  const [form, setForm] = formState
  const [, setPage] = pageState

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

export default function Index() {
  const { registerUser, login, setToasts } = useActions()
  const { toasts } = useStore()

  const formState = useState<any>({})
  const [form, setForm] = formState
  const pageState = useState('login')
  const [page, setPage] = pageState

  const props = { formState, pageState }

  async function handleSubmit(event: FormEvent) {
    try {
      event.preventDefault()

      if (page === 'login') 
        await login(form)
      else {
        await registerUser(form)
      
        setToasts([...toasts, { type: 'success', content: 'Usuário adicionar com sucesso!' }])

        setForm({})
        setPage('login')
      }
    } catch (error) {
      console.log(error)

      setToasts([...toasts, { type: 'error', content: (error as Error).message }])
    }
  }

  return (      
    <Container>
      <Form onSubmit={handleSubmit}>
        <Logo size='big' style={{ marginBottom: 60 }} />

        {page === 'signup' ? <Signup {...props} /> : <Login {...props} />}
      </Form>    
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100vh;

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

async function cb(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> {
  try {
    if (context.req.session.user) {
      context.res.setHeader('location', '/home')
      context.res.statusCode = 302
      context.res.end()

      return { props: { user: context?.req?.session?.user } }
    }
    
    return { props: { user: { role: '', username: '', isLoggedIn: false } } }
  } catch (error) {
    console.log(error)

    return { notFound: true }
  }
}

export const getServerSideProps = withIronSessionSsr(cb, sessionOptions)
