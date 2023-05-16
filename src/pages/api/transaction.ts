import { NextApiRequest, NextApiResponse } from 'next'
import { uploadTransactionsFile, fetchTransactions } from '@/controllers'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method === 'POST')
			await uploadTransactionsFile(req, res)
		else if (req.method === 'GET')
			await fetchTransactions(req, res)
		else 
			throw new Error('Nao existe um handler para essa requisição!')
	} catch (error) {
		console.log(error)

		return res.status(500).json((error as Error).message)
	}
}