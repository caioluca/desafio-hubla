import { ReactNode } from 'react'
import styled from 'styled-components'

interface IToastProviderProps {
	children: ReactNode
}

export function ToastProvider({ children }: IToastProviderProps) {
	return (
		<Container>
			<Toast>
				Sucesso ao subir o arquivo
			</Toast>
			{children}
		</Container>
	)
}

const Container = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
`

const Toast = styled.div`
	display: none;
	position: absolute;
	top: 20px;
	right: 20px;
	background: #52c41a;
	border-radius: 20px;
	padding: 20px 30px;

	color: #fff;

	font-family: 'Inter';
	font-size: 16px;
	font-weight: bold;
`

// #52c41a success
// #ff4d4f error