import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'

type TVariant = 'primary' | 'secondary'

interface IButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	variant?: TVariant
}

export function Button(props: IButtonProps) {
	return <StyledButton {...props} />
}

const StyledButton = styled.button<{ variant?: 'primary' |'secondary' }>`
  padding: 10px 30px;
  border-radius: 10px;
  background: ${({ variant }) => variant === 'secondary' ? '#FFF' : '#6359E9'};
  color: ${({ variant }) => variant === 'secondary' ? '#6359E9' : '#FFF'};
  font-weight: bold;

  border: none;
  outline: none;
  cursor: pointer;

  margin-top: 20px;
  margin-bottom: 10px;
`
