import styled from 'styled-components'

import { Logo, Menu, Profile } from '@/components'

export function SideBar() {
	return (
		<Container>
			<UpperContent>
				<Logo size='small' />

				<Menu />
			</UpperContent>

			<BottomContent>
				<Divider />

				<Profile />
			</BottomContent>
		</Container>
	)
}

const Container = styled.div`
	background-color: #1D1D41;
	width: 320px;
	height: 100%;
	border-radius: 0 20px 20px 0;
	padding: 57px 28px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

const UpperContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 62px;
`

const BottomContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 54px;
`

const Divider = styled.div`
	width: 100%;
	height: 1px;
	background-color: #4B4B99;
`
