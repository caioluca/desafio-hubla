import { ReactNode, useEffect } from 'react'
import styled from 'styled-components'

import { useActions, useStore } from '@/hooks'
import { Icon } from '@/components'

interface IToastProviderProps {
	children: ReactNode
}

export function ToastProvider({ children }: IToastProviderProps) {
	const { setToasts } = useActions()
	const { toasts } = useStore()

	useEffect(() => {
		if (!!toasts.length) {
			toasts?.map((toast) => {
				setTimeout(() => {
					const newToasts = toasts.filter((_, index) => index < toasts.length - 1)

					setToasts(newToasts)
				}, 3000)
			})
		}
	}, [toasts])

	return (
		<Container>
			<ToastsContainer>
				{toasts?.map(({ type, content }, index) => (
					<Toast key={index} type={type}>
						<Icon name={`toast-${type}`} />
						{content}
					</Toast>
				))}
			</ToastsContainer>
			{children}
		</Container>
	)
}

const Container = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
`

const ToastsContainer = styled.div`
	position: absolute;
	top: 20px;
	right: 20px;

	display: flex;
	flex-direction: column;
	gap: 10px;

	width: 350px;

	@media screen and (max-width: 530px) {
		top: unset;
		right: unset;
		width: 100%;
	}
`

const Toast = styled.div<{ type: 'success' | 'warning' | 'error' }>`
	display: flex;
	align-items: center;
	gap: 10px;

	width: 100%;

	padding: 15px 22px;

	background: ${({ type }) => type === 'success' ? '#55B938' : type === 'warning' ? '#EAC645' : '#D65745'};
	border-radius: 5px;

	color: #fff;
	font-size: 16px;
	font-weight: bold;
	z-index: 999;

	word-wrap: break-word;

	@media screen and (max-width: 530px) {
		border-radius: unset;
	}
`
