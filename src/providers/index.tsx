import { ReactNode } from 'react'
import Head from 'next/head'
import { ContextProvider } from './Context'
import { ToastProvider } from './Toast'
import { FontsProvider } from './Fonts'

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
				<FontsProvider>
					<ToastProvider>
						{children}
					</ToastProvider>
				</FontsProvider>
			</ContextProvider>
		</>
	)
}
