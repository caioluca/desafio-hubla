import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'

import { sessionOptions } from '@/lib'
import { IUserSession } from '@/types'
import { logout } from '@/controllers'

function handler(req: NextApiRequest, res: NextApiResponse<IUserSession>) {
	logout(req, res)
}

export default withIronSessionApiRoute(handler, sessionOptions)
