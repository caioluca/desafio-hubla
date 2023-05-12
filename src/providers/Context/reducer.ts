import { IAction, IInitialState } from './types'
import { TYPES } from './actionTypes'

export const initialState: IInitialState = {
	transactions: []
}

export function reducer(state: IInitialState, action: IAction) {
	const { type, payload } = action

	switch (type) {
		case TYPES.SET_TRANSACTIONS: 
			return { ...state, transactions: payload }
			
		default:
			return state
	}
}
