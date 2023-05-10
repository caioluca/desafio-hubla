import Image from 'next/image'
import styled from 'styled-components'

export function Logo() {
	return (
		<Container>
			<Img />

			<TextContainer>
				<UpperText />
				<BottomText />
			</TextContainer>
		</Container>
	)
}

const Container = styled.div`
	display: flex; 
	align-items: center;
	gap: 15px;
`

const Img = styled(Image).attrs({
	width: 39, 
	height: 49, 
	src: '/logo.svg', 
	alt: 'logo', 
})``

const TextContainer = styled.div`
	display: flex;
	flex-direction: column;
`

const UpperText = styled.span.attrs({ children: 'DESAFIO' })`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 600;
	font-size: 12px;
	line-height: 12px;

	color: #FFFFFF;
`

const BottomText = styled.span.attrs({ children: 'HUBLA' })`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 600;
	font-size: 20px;
	line-height: 24px;

	color: #FFFFFF;
`