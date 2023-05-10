import styled from 'styled-components'

export function CardSelect() {
	return (
		<Container>
			<Label children='Produtor' />
		</Container>
	)
}

const Container = styled.div`
	background-color: #1D1D41;
	border-radius: 20px;
	padding: 21px 24px;
`

const Label = styled.span`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	color: #8C89B4;	
`