import { CSSProperties, DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

export type TIconsNames = (
	'calendar' | 'down-arrow' | 'up-arrow' | 'income' | 'outcome' | 'logo' | 
	'menu' | 'password' | 'role' | 'search' | 'upload' | 'user' | 'sort' | 
	'bold-close' | 'bold-confirm' | 'close' | 'dashboard'
)

export interface IIcon {
	name: TIconsNames
	width?: number
	height?: number
	size?: number
}

export interface IOption {
	name: string
	label: string
}

export interface ISelectProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  placeholder?: string
	leftIcon?: IIcon
	rightIcon?: IIcon
	options: Array<IOption>
  listStyle?: CSSProperties
  listItemStyle?: CSSProperties
	children?: ReactNode
}
