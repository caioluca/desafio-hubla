import { ReactNode } from 'react'
import styled from 'styled-components'
import { Inter } from 'next/font/google'

interface IFontsProviderProps {
	children: ReactNode
}

const inter = Inter({
	subsets: ['latin'],
	style: ['normal'],
	weight: ['200', '300', '400', '600', '700', '900'], 
})

export function FontsProvider({ children }: IFontsProviderProps) {
	return (
		<Container className={inter.className}>
			{children}
		</Container>
	)
}

const Container = styled.div``
