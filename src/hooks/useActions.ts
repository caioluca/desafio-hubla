import { TYPES } from '@/providers/Context'
import { useStore } from '@/hooks'

export function useActions() {
	const { dispatch } = useStore()	


	async function fetchTransactions() {
		try {
			const url = 'http://localhost:3000/api/transaction'
			const reqInit = { method: 'GET' }

			let response = await fetch(url, reqInit)
			response = await response.json()

			dispatch({ type: TYPES.SET_TRANSACTIONS, payload: response })
		} catch (error) {
			console.log(error)
		}
	}

	async function uploadTransactionsFile(fileContent: string) {
		try {
			const url = 'http://localhost:3000/api/transaction'
			const reqInit = {
				method: 'POST', 
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(fileContent), 
			}

			let response = await fetch(url, reqInit)
			response = await response.json()

			dispatch({ type: TYPES.SET_TRANSACTIONS, payload: response })
		} catch (error) {
			console.log(error)
		}
	}

	return {
		fetchTransactions, 
		uploadTransactionsFile, 
	}
}
