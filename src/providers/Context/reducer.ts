import { IAction, IInitialState } from './types'
import { TYPES } from './actionTypes'

export const initialState: IInitialState = {
	counter: 0
}

export function reducer(state: IInitialState, action: IAction) {
	const { type, payload } = action

	switch (type) {
		case TYPES.INCREMENT: 
			return { ...state, counter: state.counter + 1 }

		case TYPES.DECREMENT: 
			return { ...state, counter: state.counter - 1 }
			
		default:
			return state
	}
}
