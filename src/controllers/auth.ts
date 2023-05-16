import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { compare } from 'bcrypt'

import { IUserLogin, IUserSession } from '@/types'

const prisma = new PrismaClient()

export async function login(req: NextApiRequest, res: NextApiResponse) {
	try {
		let { username, password }: IUserLogin = req?.body || {}
		username = username?.toUpperCase()


		if (!username || !password)
			throw new Error('O campo usuário ou senha não foi informado!')

		await prisma.$connect()

		const query = await prisma.user.findFirst({ where: { username } })
			
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
		await prisma.$disconnect()

		throw error
	}
}

export function logout(req: NextApiRequest, res: NextApiResponse) {
	req.session.destroy()

	return res.status(200).json({ role: '', username: '', isLoggedIn: false })
}