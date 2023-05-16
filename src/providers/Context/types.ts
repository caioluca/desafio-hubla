import { Dispatch } from 'react'
import { IUserSession, IUserLogin, INewUser, IToast, ITransaction, IOption } from '@/types'

export interface IInitialState {
	transactions: Array<ITransaction>
	isMenuOpen: boolean
	user: IUserSession
	toasts: Array<IToast>
	searchTerm: string
	form: IUserLogin | INewUser | {}
	page: 'login' | 'signup'
	sellers: Array<IOption>
	selectedSeller?: IOption
}

export interface IContext extends IInitialState {
	dispatch: Dispatch<IAction>
}

export interface IAction {
	type: string
	payload?: any
}