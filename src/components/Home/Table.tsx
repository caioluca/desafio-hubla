import { ReactNode, useEffect, useState } from 'react'
import styled from 'styled-components'

import { useStore } from '@/hooks'
import { Icon } from '@/components'
import { filterTransactions } from '@/utils'
import { ITransaction, IField } from '@/types'

const fields: Array<IField> = [
	{ name: 'type', label: 'Tipo', minWidth: 35 }, 
	{ name: 'date', label: 'Data', minWidth: 130 }, 
	{ name: 'product', label: 'Produto', minWidth: 250 }, 
	{ name: 'value', label: 'Valor', minWidth: 95 }, 
	{ name: 'seller', label: 'Vendedor', minWidth: 135 }, 
]

export function Table() {
	const { transactions, searchTerm } = useStore()
	const [parsedTransactions, setParsedTransactions] = useState<any>([])

	useEffect(() => {
		if (!!transactions.length) {
			setParsedTransactions(filterTransactions({ transactions, searchTerm }))
		}
	}, [transactions, searchTerm])

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

	&::-webkit-scrollbar {
		width: 2px;
		border-radius: 10px;
	}

	&::-webkit-scrollbar-track {
		background: transparent;
	}
	
	&::-webkit-scrollbar-thumb {
		background: #888;
		border-radius: 10px;
	}
	
	&::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
`

const StyledTable = styled.table`
	width: 100%;
`

const Row = styled.tr``

const Head = styled.thead``

const Body = styled.tbody``

const Header = styled.th`
	text-align: left;

	font-weight: 400;
	font-size: 14px;
	line-height: 15px;

	color: #AEABD8;

	padding-bottom: 25px;
`

const Data = styled.td`
	font-weight: 400;
	font-size: 14px;
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
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #8C89B4;
`