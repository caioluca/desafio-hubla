import { FormEvent } from 'react'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { withIronSessionSsr } from 'iron-session/next'
import styled from 'styled-components'

import { sessionOptions } from '@/lib'
import { Logo, Signup, Login } from '@/components'
import { useActions, useStore } from '@/hooks'
import { INewUser, IUserLogin } from '@/types'


export default function Index() {
  const { signup, login, setToasts } = useActions()
  const { toasts, page, form } = useStore()

  async function handleSubmit(event: FormEvent) {
    try {
      event.preventDefault()

      await (page === 'login' ? login(form as IUserLogin) : signup(form as INewUser))
    } catch (error) {
      console.log(error)

      setToasts([...toasts, { type: 'error', content: (error as Error).message }])
    }
  }

  return (      
    <Container>
      <Form onSubmit={handleSubmit}>
        <Logo size='big' style={{ marginBottom: 60 }} />

        {page === 'signup' ? <Signup /> : <Login />}
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
