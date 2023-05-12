import { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'
import { parser } from './utils'

const prisma = new PrismaClient()

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const transactions = await prisma.transaction.findMany()

		await prisma.$disconnect()

		return res.status(200).json(transactions)
	} catch (error) {
		console.log(error)

		await prisma.$disconnect()

		return res.status(500).send(error)
	}
}

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const { body } = req

		const parsedFileContent = parser(body)

		const promises = parsedFileContent.map(async (transaction: any) => {
			return await prisma.transaction.create({ data: transaction })
		})

		await Promise.all(promises)

		const transactions = await prisma.transaction.findMany()
		
		await prisma.$disconnect()

		return res.status(200).json(transactions)
	} catch (error) {
		console.log(error)

		await prisma.$disconnect()

		return res.status(500).send(error)
	}
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method === 'POST')
			await postHandler(req, res)
		else 
			await getHandler(req, res)
	} catch (error) {
		console.log(error)

		await prisma.$disconnect()

		return res.status(500).send(error)
	}
}