import { ReactNode } from 'react'
import { useStore } from '@/hooks'
import { ITransaction } from '@/providers/Context/types'
import styled from 'styled-components'

interface IField {
	name: 'type' | 'date' | 'product' | 'value' | 'seller'
	label: 'Tipo' | 'Data' | 'Produto' | 'Valor' | 'Vendedor'
}

const fields: Array<IField> = [
	{ name: 'type', label: 'Tipo' }, 
	{ name: 'date', label: 'Data' }, 
	{ name: 'product', label: 'Produto' }, 
	{ name: 'value', label: 'Valor' }, 
	{ name: 'seller', label: 'Vendedor' }, 
]

export function Table() {
	const { transactions } = useStore()

	return (
		<Container>
			<Head>
				<Row>
					{fields?.map((field, index) => (
						<Header key={index} children={field.label} />
					))}
				</Row>
			</Head>
			<Body>
				{transactions.map((transaction: ITransaction, index: number) => (
					<Row key={index}>
						{fields?.map((field: IField, index: number) => (
							<Data key={index}>
								{transaction[field.name] as ReactNode}
							</Data>
						))}
					</Row>
				))}
			</Body>
		</Container>
	)
}

const Container = styled.table`
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
