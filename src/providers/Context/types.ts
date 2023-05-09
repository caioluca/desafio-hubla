import { Dispatch } from 'react'

export interface IInitialState {
	counter: number
}

export interface IContext extends IInitialState {
	dispatch: Dispatch<IAction>
}

export interface IAction {
	type: string
	payload?: any
}