import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { compare } from 'bcrypt'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '@/lib'
import { IUserLogin, IUserSession } from '@/types'

const prisma = new PrismaClient()

async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== 'POST')
			throw new Error('Nao existe um handler para essa requisição!')

		let { username, password }: IUserLogin = req?.body || {}
		username = username?.toUpperCase()


		if (!username || !password)
			throw new Error('O campo usuário ou senha não foi informado!')

		await prisma.$connect()

		const query = await prisma.user.findFirst({ where: { username }, select: { role: true, username: true, password: true } })
			
		const compareHash = await compare(password, query?.password || '')
			
		if (!query || !compareHash)
			throw new Error('Usuário não encontrado ou senha incorreta!')

		await prisma.$disconnect()

		const user: IUserSession = {
			username: query?.username, 
			role: query?.role, 
			isLoggedIn: true, 
		}

		req.session.user = user
		await req.session.save()

		res.status(200).json(user)
	} catch (error) {
		console.log(error)

		await prisma.$disconnect()

		return res.status(500).json((error as Error).message)
	}
}

export default withIronSessionApiRoute(handler, sessionOptions)
