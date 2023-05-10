import Image from 'next/image'

import styled from 'styled-components'

export function CardUpload() {
	return (
		<Container>
			<Input />
			<Content>
				<Icon />
				<Label children='Insert here your transactions file' /> 
			</Content>
		</Container>
	)
}

const Container = styled.label.attrs({ htmlFor: 'upload' })`
	width: 100%;
	min-height: 250px;
	padding: 24px;
	background-color: #1D1D41;
	border-radius: 20px;
	cursor: pointer;
`

const Input = styled.input.attrs({
	type: 'file', 
	id: 'upload', 
	accept: '.txt', 
	multiple: false, 
})`
	display: none;	
`

const Content = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 10px;

	width: 100%;
	height: 100%;

	border: 3px dashed #FFF;
	border-radius: 20px;
`

const Icon = styled(Image).attrs({
	src: '/upload.svg', 
	alt: 'upload', 
	width: 50, 
	height: 50, 
})``

const Label = styled.span`
	text-align: center;
	font-family: 'Inter';
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	color: #8C89B4;
`
