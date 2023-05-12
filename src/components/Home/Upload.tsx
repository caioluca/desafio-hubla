import { ChangeEvent, useState, useRef } from 'react'
import styled from 'styled-components'

import { Icon } from '@/components'
import { useActions } from '@/hooks'

interface IFileState {
	name: string
	content: string
}

export function Upload() {
	const inputRef = useRef<HTMLInputElement>(null)
	const [file, setFile] = useState<IFileState | undefined>()

	const { uploadTransactionsFile } = useActions()

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		event.preventDefault()
		event.stopPropagation()

		const files = event.target.files as FileList
    const fr = new FileReader() as FileReader

    fr.readAsText(files[0])
    fr.addEventListener('loadend', (event) => {
			const fileContent = event.target?.result as string
			
			setFile({ name: files[0].name, content: fileContent })
		})
	}

	function handleClose() {
		if (!!inputRef.current?.files)
			inputRef.current.files = null
		setFile(undefined)
	}

	function handleConfirm() {
		if (!!file?.content)
			uploadTransactionsFile(file.content)

		handleClose()
	}

	function handlePreventClick(event: any) {
		if (!!file?.name) {
			event.preventDefault() 
			event.stopPropagation() 
		}
	}

	return (
		<Container onClick={handlePreventClick}>
			<Input 
				ref={inputRef}
				onChange={handleChange} 
			/>
			<Content file={file}>
				<Icon name='upload' size={50} />
				<Label children={file?.name || 'Insira seu arquivo com as transações'} /> 

				{file?.name && (
					<ActionsContainer>
						<Icon name='close' onClick={handleClose} />
						<Icon name='confirm' onClick={handleConfirm} />
					</ActionsContainer>
				)}
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

const Content: any = styled.div<{ file: IFileState }>`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 10px;

	width: 100%;
	height: 100%;

	border-radius: 20px;
	border: 3px dashed #8C89B4;
`

const Label = styled.span`
	text-align: center;
	font-family: 'Inter';
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	color: #8C89B4;
	max-width: 150px;
`

const ActionsContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	gap: 20px;
`