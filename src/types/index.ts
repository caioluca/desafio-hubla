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

export interface ISelectProps extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange'> {
  placeholder?: string
	leftIcon?: IIcon
	rightIcon?: IIcon
	options: Array<IOption>
  listStyle?: CSSProperties
  listItemStyle?: CSSProperties
	children?: ReactNode
	onChange?: (option: IOption) => any
}

export interface IUserSession {
	role: string
	username: string
	isLoggedIn?: boolean
}

export interface INewUser {
	role: string
	username: string
	password: string
	confirmPassword: string
}

export interface IUserLogin {
	username: string
	password: string
}