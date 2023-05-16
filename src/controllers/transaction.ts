import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

import { filterByUsernameQuery, setOrderByField, parser } from '@/utils/controllers'
import { ITransaction } from '@/types'

const prisma = new PrismaClient()

export async function fetchTransactions(req: NextApiRequest, res: NextApiResponse) {
	try {
		const { orderByField, username }: any = req?.query

		let queryParam = {}

		queryParam = setOrderByField(queryParam, orderByField)
		queryParam = await filterByUsernameQuery(queryParam, username)

		const transactions = await prisma.transaction.findMany(queryParam)

		await prisma.$disconnect()
		
		return res.status(200).json(transactions)
	} catch (error) {
		await prisma.$disconnect()
		
		throw error
	}
}

export async function uploadTransactionsFile(req: NextApiRequest, res: NextApiResponse) {
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
		await prisma.$disconnect()

		throw error
	}
}