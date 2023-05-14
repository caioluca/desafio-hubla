import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'
import { INewUser } from '@/types'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== 'POST')
			throw new Error('Nao existe um handler para essa requisição!')

		let { role, username, password, confirmPassword }: INewUser = req?.body || {}
		username = username.toUpperCase()
	
		const passwordAndConfirmPasswordMatch = password === confirmPassword

		if (!passwordAndConfirmPasswordMatch)
			throw new Error('A senha e a confirmação de senha não coincidem!')

		await prisma.$connect()

		const userAlreadyExistis = await prisma.user.findFirst({ where: { username } })

		if (!!userAlreadyExistis)
			throw new Error('O Usuário que está tentando inserir já existe!')

		const passwordHash = await hash(password, 10)

		const newUser = await prisma.user.create({ data: { role, username, password: passwordHash } })

		await prisma.$disconnect()

		res.status(200).json(newUser)
	} catch (error) {
		console.log(error)

		await prisma.$disconnect()

		return res.status(500).json({ message: (error as Error).message })
	}
}