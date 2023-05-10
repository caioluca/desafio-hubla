import styled from 'styled-components'

const fields = [
	'Tipo', 
	'Data', 
	'Produto', 
	'Valor', 
	'Vendedor', 
]

export function Table() {
	return (
		<Container>
			<Head>
				<Row>
					{fields?.map((field, index) => <Header key={index} children={field} />)}
				</Row>
			</Head>
			<Body>
				{[].map((row, index) => (
					<Row key={index}>
						{fields?.map((field, index) => <Data key={index} children={row[field]} />)}
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
