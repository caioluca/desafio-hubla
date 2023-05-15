import styled from 'styled-components'

import { Input, Select, Table } from '@/components'
import { ChangeEvent } from 'react'
import { IOption } from '@/types'
import { useActions, useStore } from '@/hooks'

const options = [
	{ label: 'Nenhum', name: '' }, 
	{ label: 'Tipo', name: 'type' }, 
	{ label: 'Data', name: 'date' }, 
	{ label: 'Produto', name: 'product' }, 
	{ label: 'Valor', name: 'value' }, 
	{ label: 'Vendedor', name: 'seller' }, 
]

export function Transaction() {
	const { user: { username }, toasts, searchTerm } = useStore()
	const { fetchTransactions, setSearchTerm, setToasts } = useActions()

	function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
		const { value = '' } = event?.target || {}

		setSearchTerm(value)
	}

	async function handleSelectChange({ name }: IOption) {
		try {
			await fetchTransactions({ username, orderByField: name })
		} catch (error) {
			console.log(error)

      setToasts([
				...toasts, 
				{
					type: 'error', 
					content: (error as Error).message
				}
			])
		}
	}

	return (
		<Container>
			<Header>
				<Title children='Transações'/>
				<Filters>
					<Search onChange={handleInputChange} value={searchTerm} />
					<Sort onChange={handleSelectChange} />
				</Filters>
			</Header>

			<Table />
		</Container>
	)
}

const Container = styled.div`
	width: calc(100% - 300px);
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 35px;
	padding: 19px 23px;
	border-radius: 20px;
	background-color: #1D1D41;

	@media screen and (max-width: 768px) {
		width: 100%
	}
`

const Header = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 10px;

	@media screen and (max-width: 530px) {
		flex-direction: column;
		align-items: start;
	}
`

const Title = styled.span`
	font-weight: 600;
	font-size: 20px;
	line-height: 25px;
	color: #FFFFFF;	
`

const Filters = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;

	@media screen and (max-width: 530px) {
		width: 100%;
		flex-direction: column;
	}
`

const Search = styled(Input).attrs({
	rightIcon: { name: 'search' },
	placeholder: 'Procurar por...',
})``

const Sort = styled(Select).attrs({
	leftIcon: { name: 'sort' }, 
	options: options, 
	placeholder: 'Filtrar por...', 
})`
	background: none;
	border: 1px solid #8C89B4;
`