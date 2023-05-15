import { IAction, IInitialState } from './types'
import { TYPES } from './actionTypes'

export const initialState: IInitialState = {
	transactions: [],
	isMenuOpen: false,
	user: { isLoggedIn: false, role: '', username: '' }, 
	toasts: [],
	searchTerm: '',
}

export function reducer(state: IInitialState, action: IAction) {
	const { type, payload } = action

	switch (type) {
		case TYPES.SET_TRANSACTION_SEARCH_TERM: 
			return { ...state, searchTerm: payload }

		case TYPES.SET_TOASTS: 
			return { ...state, toasts: payload }

		case TYPES.TOOGLE_IS_MENU_OPEN: 
			return { ...state, isMenuOpen: !state.isMenuOpen }

		case TYPES.SET_USER: 
			return { ...state, user: payload }

		case TYPES.SET_TRANSACTIONS: 
			return { ...state, transactions: payload }
			
		default:
			return state
	}
}
