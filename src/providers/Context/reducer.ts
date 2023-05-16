import { IAction, IInitialState } from './types'
import { TYPES } from './actionTypes'

export const initialState: IInitialState = {
	transactions: [],
	isMenuOpen: false,
	user: { isLoggedIn: false, role: '', username: '' }, 
	toasts: [],
	searchTerm: '',
	form: {},
	page: 'login',
	sellers: [],
	selectedSeller: undefined
}

export function reducer(state: IInitialState, action: IAction) {
	const { type, payload } = action

	switch (type) {
		case TYPES.SET_SELECTED_SELLER: 
			return { ...state, selectedSeller: payload }

		case TYPES.SET_SELLERS: 
			return { ...state, sellers: payload }

		case TYPES.SET_FORM: 
			return { ...state, form: payload }

		case TYPES.SET_PAGE: 
			return { ...state, page: payload }

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
