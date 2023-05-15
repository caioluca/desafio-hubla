import { CSSProperties } from 'react'
import Image from 'next/image'
import styled from 'styled-components'

type TSize = 'small' | 'big'

interface ILogoProps {
	size: TSize
	style?: CSSProperties
}

export function Logo({ size, style }: ILogoProps) {
	return (
		<Container style={style}>
			<Img size={size} />

			<TextContainer>
				<UpperText size={size} />
				<BottomText size={size} />
			</TextContainer>
		</Container>
	)
}

const Container = styled.div`
	display: flex; 
	align-items: center;
	gap: 15px;
`

const Img: any = styled(Image).attrs<{ size: TSize }>(({ size }) => {
	return {
		...(size === 'big' ? {
			width: 90, 
			height: 100, 
		} : {
			width: 39, 
			height: 49, 
		}), 
		src: '/svgs/logo.svg', 
		alt: 'logo', 
	}
})``

const TextContainer = styled.div`
	display: flex;
	flex-direction: column;
`

const UpperText = styled.span.attrs({ children: 'DESAFIO' })<{ size: TSize }>`
	font-weight: 600;
	${({ size }) => true ? `
		font-size: 18px;
  	line-height: 18px;
	` : `
		font-size: 12px;
		line-height: 12px;
	`}

	color: #FFFFFF;
	user-select: none;
`

const BottomText = styled.span.attrs({ children: 'HUBLA' })<{ size: TSize }>`
	font-style: normal;
	font-weight: 600;
	${({ size }) => size === 'big' ? `
		font-size: 30px;
  	line-height: 34px;
	` : `
		font-size: 20px;
		line-height: 24px;
	`}

	color: #FFFFFF;
	user-select: none;
`