import { ReactNode, useEffect, useState } from 'react'
import { useStore } from '@/hooks'
import { ITransaction } from '@/providers/Context/types'

import styled from 'styled-components'

import { formatCurrency, formatDate } from '@/utils'

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
	const { transactions } = useStore()
	const [parsedTransactions, setParsedTransactions] = useState<any>([])

	useEffect(() => {
		if (!!transactions.length) {
			const newTransaction = transactions.map((transaction) => {
				return {
					...transaction,
					date: formatDate(transaction.date),
					value: formatCurrency(transaction.value)
				}
			})

			setParsedTransactions(newTransaction)
		}
	}, [transactions])

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
		</Container>
	)
}

const Container = styled.div`
	width: 100%;
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
