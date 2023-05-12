import styled from 'styled-components'

import { Input, Select, Table } from '@/components'

const options = [
	{ label: 'Nenhum', name: 'none' }, 
	{ label: 'Tipo', name: 'type' }, 
	{ label: 'Data', name: 'date' }, 
	{ label: 'Produto', name: 'produdct' }, 
	{ label: 'Valor', name: 'value' }, 
	{ label: 'Vendedor', name: 'seller' }, 
]

export function Transaction() {
	return (
		<Container>
			<Header>
				<Title children='Transações'/>
				<Filters>
					<Input rightIcon={{ name: 'search' }} placeholder='Procurar por...' />
					<Select
						style={{ background: 'none', border: '1px solid #8C89B4' }}
						leftIcon={{ name: 'sort' }} 
						options={options} 
						placeholder='Filtrar por...'
					/>
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
	gap: 10px;
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