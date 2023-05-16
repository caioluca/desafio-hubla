import { NextApiRequest, NextApiResponse } from 'next'
import { signup } from '@/controllers'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method === 'POST')
			await signup(req, res)
		else
			throw new Error('Nao existe um handler para essa requisição!')
	} catch (error) {
		console.log(error)

		return res.status(500).json((error as Error).message)
	}
}