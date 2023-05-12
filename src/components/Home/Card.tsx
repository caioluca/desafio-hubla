import styled from 'styled-components'

import { Icon } from '@/components'

type TType = 'income' | 'outcome'

interface ICardProps {
	value: string
	type: TType
}

export function Card({ value, type }: ICardProps) {
	return (
		<Container>
			<Icon name={type} size={45} />
			<Info>
				<Label children={`Total ${type}`} />
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