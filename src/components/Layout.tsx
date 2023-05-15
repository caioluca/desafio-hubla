import { ReactNode } from 'react'
import styled from 'styled-components'

import { SideBar, MobileSideBar } from '@/components'
import { useStore } from '@/hooks'

interface ILayoutProps {
	children: ReactNode
}

export function Layout({ children }: ILayoutProps) {
	const { isMenuOpen } = useStore()

	return (
		<Container>
			<MobileSideBar />
			<SideBar />
			<Content isMenuOpen={isMenuOpen}>
				{children}
			</Content>
		</Container>
	)
}

const Container = styled.div`
	position: relative;
	width: 100%;
	min-height: 100vh;
	background-color: #141332;

	display: flex;
	
	@media screen and (max-width: 1024px) {
		flex-direction: column;
	}
`

const Content = styled.div<any>`
	width: calc(100% - 250px);
	height: 100%;
	
	padding: 46px 26px;
	
	display: flex;
	gap: 26px;
	
	@media screen and (max-width: 768px) {
		flex-direction: column-reverse;
		display: ${({ isMenuOpen }) => !!isMenuOpen ? 'none' : 'display'}
	}

	@media screen and (max-width: 1024px){
		width: 100%;
	}
`