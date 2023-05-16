import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'

import { sessionOptions } from '@/lib'
import { login } from '@/controllers'

async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method === 'POST')
			await login(req, res)
		else 
			throw new Error('Nao existe um handler para essa requisição!')

	} catch (error) {
		console.log(error)

		return res.status(500).json((error as Error).message)
	}
}

export default withIronSessionApiRoute(handler, sessionOptions)
