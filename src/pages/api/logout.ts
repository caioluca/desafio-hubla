import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '@/lib'
import { IUserSession } from '@/types'

async function handler(req: NextApiRequest, res: NextApiResponse<IUserSession>) {
	req.session.destroy()

	res.status(200).json({ role: '', username: '', isLoggedIn: false })
}

export default withIronSessionApiRoute(handler, sessionOptions)
