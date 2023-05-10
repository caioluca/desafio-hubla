import styled from 'styled-components'
import Image from 'next/image'

export function Select() {
	return (
		<Container>
			<Icon />
			<Label children='10 May - 20 May' />
			<DownArrow />
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 11px 7px;
	border: 1px solid rgba(174, 171, 216, 0.53);
	border-radius: 10px;
`

const Icon = styled(Image).attrs({
	src: '/calendar.svg', 
	alt: 'calendar', 
	width: 18, 
	height: 18, 
})``

const Label = styled.span`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 400;
	font-size: 12px;
	line-height: 15px;
	color: #AEABD8;
`

const DownArrow = styled(Image).attrs({
	src: '/down-arrow.svg',
	alt: 'down-arrow',
	width: 10,
	height: 10,
})``