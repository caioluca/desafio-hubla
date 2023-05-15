import { Layout, Transaction, SidePanel } from '@/components'
import { useActions, useStore } from '@/hooks'
import { useEffect } from 'react'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '@/lib'

import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { IUserSession } from '@/types'

interface IHomeProps {
  user: IUserSession
}

export default function Home({ user }: IHomeProps) {
  const { fetchTransactions, setUser, setToasts } = useActions()
  const { toasts } = useStore()

  useEffect(() => {
    (async () => {
      try {
        setUser(user)
        await fetchTransactions({ username: user?.username })
      } catch (error) {
        console.log(error)

        setToasts([...toasts, { type: 'error', content: (error as Error).message }])
      }
    })()
  }, [user])

  return (
    <Layout>
      <Transaction />
      <SidePanel />
    </Layout>
  )
}

async function cb(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{ user: IUserSession }>> {
  try {
    if (!context.req.session.user) {
      context.res.setHeader('location', '/')
      context.res.statusCode = 302
      context.res.end()

      return { props: { user: { role: '', username: '', isLoggedIn: false } } }
    }
    
    return { props: { user: context?.req?.session?.user } }
  } catch (error) {
    console.log(error)

    return { notFound: true }
  }
}

export const getServerSideProps = withIronSessionSsr(cb, sessionOptions)
