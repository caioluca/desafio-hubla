import Image from 'next/image'

import styled from 'styled-components'

export function Input() {
	return (
		<Container>
			<StyledInput />

			<Image src='/search.svg' alt='search' width={16} height={16} />
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
	background: #27264E;
	padding: 15px 23px;
	border-radius: 10px;
`

const StyledInput = styled.input.attrs({ type: 'text', placeholder: 'Search for anything...' })`
	width: 100%;
	border: none;
	background: none;
	outline: none;

	font-family: 'Inter';
	font-style: normal;
	font-weight: 400;
	font-size: 12px;
	line-height: 15px;

	color: #AEABD8;
`
