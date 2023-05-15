import styled from 'styled-components'

import { Logo, Icon } from '@/components'

import { useActions } from '@/hooks'

export function MobileSideBar() {
	const { toggleIsMenuOpen } = useActions()

	return (
		<Container>
			<Logo size='small' />
			<Icon
				name='menu' 
				size={30} 
				style={{ cursor: 'pointer' }} 
				onClick={toggleIsMenuOpen}
			/>
		</Container>
	)
}

const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15px 26px;
	background-color: #1D1D41;

	@media screen and (min-width: 1025px) {
		display: none;
	}
`