import { TIconsNames } from '@/types'
import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import styled from 'styled-components'

import { Icon } from '@/components'

interface IIcon {
	name: TIconsNames
	width?: number
	height?: number
	size?: number
}

interface IInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	leftIcon?: IIcon
	rightIcon?: IIcon
}

export function Input(props: IInputProps) {
	const {
		style, 
		leftIcon, 
		rightIcon, 
		...rest
	} = props

	return (
		<Container style={style}>
			<LeftContent>
				{leftIcon && <Icon {...leftIcon} />}
				<StyledInput {...rest} />
			</LeftContent>
			{rightIcon && <Icon {...rightIcon} />}
		</Container>
	)
}

const Container = styled.div`
	width: 100%;

	display: flex;
  align-items: center;
  gap: 10px;

  padding: 10px 13px;
  background: #27264E;

  border-radius: 10px;
`

const LeftContent = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	gap: 10px;
`

const StyledInput = styled.input<IInputProps>`
	width: 100%;

	border: none;
	background: none;
	outline: none;
	
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 20px;

	color: #AEABD8;

	&::placeholder {
		color: #706e98;
	}
`
