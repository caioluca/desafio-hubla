import { createContext, ReactNode, useReducer } from 'react'
import { initialState, reducer } from './reducer'
import { IContext } from './types'

export { TYPES } from './actionTypes'

interface IContextProviderProps {
	children: ReactNode
}

export const Context = createContext<IContext>({ ...initialState, dispatch: () => {} })

export function ContextProvider({ children }: IContextProviderProps) {
	const [state, dispatch] = useReducer(reducer, initialState)

	const value: IContext = { ...state, dispatch }

	return (
		<Context.Provider value={value}>
			{children}
		</Context.Provider>
	)
}
