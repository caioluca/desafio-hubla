import styled from 'styled-components'

import { Logo, Menu, Profile, Icon } from '@/components'
import { useActions, useStore } from '@/hooks'

export function SideBar() {
	const { isMenuOpen } = useStore()
	const { toggleIsMenuOpen } = useActions()

	return (
		<Container isMenuOpen={isMenuOpen}>
			<UpperContent>
				<LogoContainer>
					<Logo size='small' />
					<CloseIcon onClick={toggleIsMenuOpen} />
				</LogoContainer>

				<Menu />
			</UpperContent>

			<BottomContent>
				<Divider />

				<Profile />
			</BottomContent>
		</Container>
	)
}

const Container = styled.div<any>`
	background-color: #1D1D41;
	width: 250px;
	border-radius: 0 20px 20px 0;
	padding: 57px 26px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	@media screen and (max-width: 1024px) {
		position: absolute;
		width: 100%;
		height: 100vh;
		border-radius: unset;
		z-index: 2;
		display: ${({ isMenuOpen }) => !!isMenuOpen ? 'flex' : 'none'};
	}
	`

const LogoContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
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

const CloseIcon = styled(Icon).attrs({ name: 'close' })`
	cursor: pointer;

	@media screen and (min-width: 1025px) {
		display: none;
	}
`
