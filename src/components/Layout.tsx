import { ReactNode } from 'react'
import styled from 'styled-components'

import { SideBar } from '@/components'

interface ILayoutProps {
	children: ReactNode
}

export function Layout({ children }: ILayoutProps) {
	return (
		<Container>
			<SideBar />
			<Content>
				{children}
			</Content>
		</Container>
	)
}

const Container = styled.div`
	width: 100%;
	height: 100%;
	background-color: #141332;

	display: flex;
`

const Content = styled.div`
	width: calc(100% - 320px);
	height: 100%;

	padding: 46px 26px;

	display: flex;
	gap: 26px;
`