import { CSSProperties, DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

export interface IFilterBySearchTermCBParams {
  transaction: ITransaction
  searchTerm: string
}
export interface IField {
	name: 'type' | 'date' | 'product' | 'value' | 'seller'
	label: 'Tipo' | 'Data' | 'Produto' | 'Valor' | 'Vendedor'
	minWidth: number
}
export interface IHandleOutcomeNCommissionReturn {
  outcome: number
  commission: number
}

export interface ISumTransactionsValueParams {
  transactions: Array<ITransaction>
  filter: (transaction: ITransaction) => boolean
}

export interface IHandleOutcomeNComissionParams {
	transactions: Array<ITransaction>
	isProducer?: boolean
	user?: IUserSession
	option?: IOption
	producers?: Array<string>
	type: 'change' | 'load'
}
export interface ICardProps {
	label: string
	type: 'profit' | 'prejudice'
}

export type TTransactionType = '1' | '2' | '3' | '4'

export type TIconsNames = (
	'calendar' | 'down-arrow' | 'up-arrow' | 'profit' | 'prejudice' | 'logo' | 
	'menu' | 'password' | 'role' | 'search' | 'upload' | 'user' | 'sort' | 
	'bold-close' | 'bold-confirm' | 'close' | 'dashboard' | 'toast-warning' | 
	'toast-error' | 'toast-success' | 'empty'
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

export type TType = 'success' | 'warning' | 'error'
export interface IToast {
	type: TType
	content: string
}

export interface ITransaction {
	type: '1' | '2' | '3' | '4'
	date: Date | string
	product: string
	value: string | number
	seller: string
}