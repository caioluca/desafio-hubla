import { Dispatch } from 'react'

export interface ITransaction {
	type: '1' | '2' | '3' | '4'
	date: Date
	product: string
	value: string
	seller: string
}

export interface IInitialState {
	transactions: Array<ITransaction>
	isMenuOpen: boolean
}

export interface IContext extends IInitialState {
	dispatch: Dispatch<IAction>
}

export interface IAction {
	type: string
	payload?: any
}