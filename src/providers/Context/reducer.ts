import { IAction, IInitialState } from './types'
import { TYPES } from './actionTypes'

export const initialState: IInitialState = {
	transactions: [],
	isMenuOpen: false
}

export function reducer(state: IInitialState, action: IAction) {
	const { type, payload } = action

	switch (type) {
		case TYPES.TOOGLE_IS_MENU_OPEN: 
			return { ...state, isMenuOpen: !state.isMenuOpen }

		case TYPES.SET_TRANSACTIONS: 
			return { ...state, transactions: payload }
			
		default:
			return state
	}
}
