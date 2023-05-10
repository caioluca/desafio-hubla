import styled from 'styled-components'

import { Input, Select, Table } from '@/components'

export function Transaction() {
	return (
		<Container>
			<Header>
				<Title children='Transaction'/>
				<Filters>
					<Input />
					<Select />
				</Filters>
			</Header>

			<Table />
		</Container>
	)
}

const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 35px;
	padding: 19px 23px;
	border-radius: 20px;
	background-color: #1D1D41;
`

const Header = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`

const Title = styled.span`
	font-family: Inter;
	font-style: normal;
	font-weight: 600;
	font-size: 20px;
	line-height: 25px;
	color: #FFFFFF;	
`

const Filters = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`