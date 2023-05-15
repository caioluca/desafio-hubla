import { ReactNode, useEffect, useState } from 'react'
import styled from 'styled-components'

import { useStore } from '@/hooks'
import { Icon } from '@/components'
import { formatCurrency, formatDate } from '@/utils'
import { ITransaction } from '@/types'

interface IField {
	name: 'type' | 'date' | 'product' | 'value' | 'seller'
	label: 'Tipo' | 'Data' | 'Produto' | 'Valor' | 'Vendedor'
	minWidth: number
}

const fields: Array<IField> = [
	{ name: 'type', label: 'Tipo', minWidth: 35 }, 
	{ name: 'date', label: 'Data', minWidth: 130 }, 
	{ name: 'product', label: 'Produto', minWidth: 250 }, 
	{ name: 'value', label: 'Valor', minWidth: 95 }, 
	{ name: 'seller', label: 'Vendedor', minWidth: 135 }, 
]

export function Table() {
	const { user, transactions, transactionSearchTerm } = useStore()
	const [parsedTransactions, setParsedTransactions] = useState<any>([])

	useEffect(() => {
		if (!!transactions.length) {
			const newTransaction = transactions
				.map(({ date, value, ...rest }) => {
					return { ...rest, date: formatDate(date), value: formatCurrency(value) }
				})
				.filter((transaction) => {
					const { type, date, product, value, seller } = transaction

					const condition = 
						type.match(RegExp(transactionSearchTerm, 'ig')) || 
						date.match(RegExp(transactionSearchTerm, 'ig')) || 
						product.match(RegExp(transactionSearchTerm, 'ig')) || 
						value.match(RegExp(transactionSearchTerm, 'ig')) || 
						seller.match(RegExp(transactionSearchTerm, 'ig'))

					return condition
				})

			setParsedTransactions(newTransaction)
		}
	}, [transactions, transactionSearchTerm])

	return (
		<Container>
			<StyledTable>
				<Head>
					<Row>
						{fields?.map((field, index) => (
							<Header key={index} children={field.label} style={{ minWidth: field.minWidth }} />
						))}
					</Row>
				</Head>
				<Body>
					{parsedTransactions.map((transaction: ITransaction, index: number) => (
						<Row key={index}>
							{fields?.map((field: IField, index: number) => (
								<Data key={index}>
									{transaction[field.name] as ReactNode}
								</Data>
							))}
						</Row>
					))}
				</Body>
			</StyledTable>
			{!parsedTransactions?.length && (
				<EmptyContainer>
					<Icon name='empty' size={150} />
					<EmptyLabel children='Não há nenhuma informação na tabela' />
				</EmptyContainer>
			)}
		</Container>
	)
}

const Container = styled.div`
	width: 100%;
	max-height: calc(100vh - 220px);
	overflow: scroll;
`

const StyledTable = styled.table`
	width: 100%;
`

const Row = styled.tr``

const Head = styled.thead``

const Body = styled.tbody``

const Header = styled.th`
	text-align: left;

	font-family: 'Inter';
	font-style: normal;
	font-weight: 400;
	font-size: 12.1373px;
	line-height: 15px;

	color: #AEABD8;

	padding-bottom: 25px;
`

const Data = styled.td`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 400;
	font-size: 13.8711px;
	line-height: 17px;

	color: #FFFFFF;

	padding-bottom: 25px;
`

const EmptyContainer = styled.div`
	width: 100%;
	padding: 30px;
	padding-top: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const EmptyLabel = styled.span`
	font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #8C89B4;
`