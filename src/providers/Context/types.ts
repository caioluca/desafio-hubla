import { Dispatch } from 'react'
import { IUserSession, IToast, ITransaction } from '@/types'

export interface IInitialState {
	transactions: Array<ITransaction>
	isMenuOpen: boolean
	user: IUserSession
	toasts: Array<IToast>
	searchTerm: string
}

export interface IContext extends IInitialState {
	dispatch: Dispatch<IAction>
}

export interface IAction {
	type: string
	payload?: any
}