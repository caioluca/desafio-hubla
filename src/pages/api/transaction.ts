import { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'
import { parser } from '@/utils'
import { ITransaction } from '@/types'

const prisma = new PrismaClient()

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const { orderByField, username }: any = req?.query

		let queryParam = {
			...(!!orderByField ? { orderBy: { [(orderByField as string)]: 'asc' } } : {})
		}

		if (!!username) {
			const user = await prisma.user.findFirst({ where: { username } })


			if (user?.role === 'producer') {
				const userTransaction: any = await prisma.transaction.findFirst({ where: { type: '1', seller: user?.username } })

				queryParam = { 
					...queryParam, 
					...(!!userTransaction?.product ? { where: { product: userTransaction?.product } } : {})
				}
			}

			if (user?.role === 'affiliate') 
				queryParam = { 
					...queryParam, 
					...(!!username ? { where: { seller: username } } : {})
				}
		}

		const transactions = await prisma.transaction.findMany(queryParam)

		await prisma.$disconnect()

		return res.status(200).json(transactions)
	} catch (error) {
		console.log(error)

		await prisma.$disconnect()

		return res.status(500).json((error as Error).message)
	}
}

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const { body } = req

		const parsedFileContent = parser(body)

		const promises = parsedFileContent.map(async (transaction: ITransaction) => {
			const { value, ...rest } = transaction
			return await prisma.transaction.create({ data: { ...rest, value: value as string } })
		})

		await Promise.all(promises)

		const transactions = await prisma.transaction.findMany()
		
		await prisma.$disconnect()

		return res.status(200).json(transactions)
	} catch (error) {
		console.log(error)

		await prisma.$disconnect()

		return res.status(500).json((error as Error).message)
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

		return res.status(500).json((error as Error).message)
	}
}