import { TYPES } from '@/providers/Context'
import { useStore } from '@/hooks'
import { IUserLogin, INewUser, IUserSession } from '@/types'
import { validateForm } from '@/utils'
import { useRouter } from 'next/router'
import { IToast } from '@/types'

export function useActions() {
	const { dispatch, toasts } = useStore()	
	const router = useRouter()

	function toggleIsMenuOpen() {
		dispatch({ type: TYPES.TOOGLE_IS_MENU_OPEN })
	}

	function setUser(user: IUserSession) {
		dispatch({ type: TYPES.SET_USER, payload: user })
	}

	function setToasts(toasts: Array<IToast>) {
		dispatch({ type: TYPES.SET_TOASTS, payload: toasts })
	}

	async function fetchTransactions() {
		try {
			const url = 'http://localhost:3000/api/transaction'
			const options = { method: 'GET' }

			const req = new Request(url, options)
			const response = await fetch(req)
			const data = await response.json()

			if (response.status !== 200) {
				throw new Error(data)
			}

			dispatch({ type: TYPES.SET_TRANSACTIONS, payload: data })
		} catch (error) {
			throw error
		}
	}

	async function uploadTransactionsFile(fileContent: string) {
		try {
			const url = 'http://localhost:3000/api/transaction'
			const options = {
				method: 'POST', 
				headers: {
					'Content-Type': 'application/json'
				}, 
				body: JSON.stringify(fileContent), 
			}

			const req = new Request(url, options)
			const response = await fetch(req)
			const data = await response.json()

			if (response.status !== 200) {
				throw new Error(data)
			}

			dispatch({ type: TYPES.SET_TOASTS, payload: [...toasts, { type: 'success', content: 'Arquivo subiu com sucesso!' }] })

			dispatch({ type: TYPES.SET_TRANSACTIONS, payload: data })
		} catch (error) {
			throw error
		}
	}

	async function registerUser(newUser: INewUser) {
		try {
			validateForm(newUser, 'register')

			const url = 'http://localhost:3000/api/user'
			const options = {
				method: 'POST', 
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newUser), 
			}

			const req = new Request(url, options)
			const response = await fetch(req)
			const data = await response.json()
			
			if (response.status !== 200) 
				throw new Error(data)

		} catch (error) {
			throw error
		}
	}

	async function login(user: IUserLogin) {
		try {
			validateForm(user, 'login')

			const url = 'http://localhost:3000/api/login'
			const options = {
				method: 'POST', 
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(user), 
			}

			const req = new Request(url, options)
			const response = await fetch(req)
			const data = await response.json()

			if (response.status !== 200) 
				throw new Error(data)

			router.push('/home')
		} catch (error) {
			throw error
		}
	}

	async function logout() {
		try {
			const url = 'http://localhost:3000/api/logout'
			const options = { method: 'GET' }

			const req = new Request(url, options)
			const response = await fetch(req)
			const data = await response.json()
			
			if (response.status !== 200) 
				throw new Error(data)

			router.push('/')
		} catch (error) {
			throw error
		}
	}

	return {
		setToasts, 
		logout, 
		login, 
		registerUser, 
		setUser, 
		toggleIsMenuOpen, 
		fetchTransactions, 
		uploadTransactionsFile, 
	}
}
