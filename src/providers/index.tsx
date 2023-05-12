import { ReactNode } from 'react'
import Head from 'next/head'
import { ContextProvider } from './Context'

interface IProvidersProps {
	children: ReactNode
}

export function Providers({ children }: IProvidersProps) {
	return (
		<>
			<Head>
				<link rel='icon' href='/favicon.ico' />
				<title>Desafio Hubla</title>
			</Head>
			<ContextProvider>
				{children}
			</ContextProvider>
		</>
	)
}
