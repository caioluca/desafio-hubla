import styled from 'styled-components'

import { Icon } from '@/components'

export function Menu() {
	return (
		<Container>
			<Item>
				<Icon name='menu' size={24} />
				<ItemText children='Dashboard' />
			</Item>
		</Container>
	)
}

const Container = styled.ul`
	list-style: none;
`

const Item = styled.li`
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 17px 15px;
	background-color: #6359E9;
	border-radius: 10px;
	cursor: pointer;
`

const ItemText = styled.span`
	font-family: Inter;
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 19px;
	color: #FFFFFF;
`