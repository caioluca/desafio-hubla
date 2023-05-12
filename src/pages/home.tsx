import { Layout, Transaction, SidePanel } from '@/components'
import { useActions } from '@/hooks'
import { useEffect } from 'react'

export default function Home() {
  const { fetchTransactions } = useActions()

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <Layout>
      <Transaction />
      <SidePanel />
    </Layout>
  )
}
