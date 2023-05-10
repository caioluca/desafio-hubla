import Image, { ImageProps } from 'next/image'
import styled from 'styled-components'

type TMode = 'income' | 'outcome'

interface ICardProps {
	value: string
	mode: TMode
}

export function Card({ value, mode }: ICardProps) {
	return (
		<Container>
			<Icon mode={mode} />
			<Info>
				<Label children={`Total ${mode}`} />
				<Value children={`$${value}`} />
			</Info>
		</Container>
	)
}

const Container = styled.div`
	background-color: #1D1D41;
	border-radius: 20px;
	padding: 41px 24px;
	display: flex;
	align-items: center;
	gap: 23px;
`

const Icon: any = styled(Image).attrs((props: any) => ({
	src: `/${props.mode}.svg`, 
	alt: props.mode, 
	width: 45, 
	height: 45, 
}))``

const Info = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`

const Label = styled.span`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	color: #8C89B4;
`

const Value = styled.span`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 600;
	font-size: 24px;
	line-height: 29px;
	color: #FFFFFF;
`