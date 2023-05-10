import Image from 'next/image'
import styled from 'styled-components'

export function Menu() {
	return (
		<Container>
			<Item>
				<ItemImg />
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
`

const ItemImg = styled(Image).attrs({
	src: '/menu.svg', 
	alt: 'menu', 
	width: 24, 
	height: 24, 
})``

const ItemText = styled.span`
	font-family: Inter;
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 19px;
	color: #FFFFFF;
`