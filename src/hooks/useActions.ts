import { TYPES } from '@/providers/Context'
import { useStore } from '@/hooks'
import { IUserLogin, INewUser, IUserSession } from '@/types'
import { request, validateForm } from '@/utils'
import { useRouter } from 'next/router'

export function useActions() {
	const { dispatch } = useStore()	
	const router = useRouter()

	function toggleIsMenuOpen() {
		dispatch({ type: TYPES.TOOGLE_IS_MENU_OPEN })
	}

	function setUser(user: IUserSession) {
		dispatch({ type: TYPES.SET_USER, payload: user })
	}

	async function fetchTransactions() {
		try {
			const response = await request('/transaction', { method: 'GET' })

			dispatch({ type: TYPES.SET_TRANSACTIONS, payload: response.data })
		} catch (error) {
			throw error
		}
	}

	async function uploadTransactionsFile(fileContent: string) {
		try {
			const options = {
				method: 'POST', 
				headers: {
					'Content-Type': 'application/json'
				}, 
				body: JSON.stringify(fileContent), 
			}

			const response = await request('/transaction', options)

			dispatch({ type: TYPES.SET_TRANSACTIONS, payload: response.data })
		} catch (error) {
			throw error
		}
	}

	async function registerUser(newUser: INewUser) {
		try {
			validateForm(newUser, 'register')

			const options = {
				method: 'POST', 
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newUser), 
			}

			const response = await request('/user', options)

		} catch (error) {
			throw error
		}
	}

	async function login(user: IUserLogin) {
		try {
			validateForm(user, 'login')

			const options = {
				method: 'POST', 
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(user), 
			}

			const response = await request('/login', options)			

			router.push('/home')
		} catch (error) {
			throw error
		}
	}

	async function logout() {
		try {
			const options = { method: 'GET' }

			const response = await request('/logout', options)

			router.push('/')
		} catch (error) {
			throw error
		}
	}

	return {
		logout, 
		login, 
		registerUser, 
		setUser, 
		toggleIsMenuOpen, 
		fetchTransactions, 
		uploadTransactionsFile, 
	}
}
