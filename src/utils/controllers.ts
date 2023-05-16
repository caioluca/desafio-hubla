import { PrismaClient } from '@prisma/client'

import { ITransaction, TTransactionType } from '@/types'

const prisma = new PrismaClient()

export async function filterByUsernameQuery(queryParam: any, username?: string) {
	try {
		if (!!username) {
		const user = await prisma.user.findFirst({ where: { username } })

		if (user?.role === 'producer') {
			const userTransaction: any = await prisma.transaction.findFirst({ where: { type: '1', seller: user?.username } })

			return { 
				...queryParam, 
				...(!!userTransaction?.product ? { where: { product: userTransaction?.product } } : {})
			}
		}

		if (user?.role === 'affiliate') 
			return { 
				...queryParam, 
				...(!!username ? { where: { seller: username } } : {})
			}
	}

	return queryParam
	} catch (error) {
		await prisma.$disconnect()

		throw error
	}
}

export function setOrderByField(queryParam: any, orderByField?: string) {
	return {
		...queryParam,
		...(!!orderByField ? { orderBy: { [(orderByField as string)]: 'asc' } } : {})
	}
}

export function parser(file: string): Array<ITransaction> {
	const result = file.split(/\r?\n|\r|\n/g)

	if (!result[result.length - 1])
		result.pop()

	const parsedResult = result.map((row: string) => {
		const parsedRow = {
			type: row.slice(0, 0 + 1) as TTransactionType, 
			date: new Date(row.slice(1, 1 + 25)), 
			product: row.slice(26, 26 + 30), 
			value: row.slice(56, 56 + 10), 
			seller: row.slice(66, 66 + 20), 
		}

		return parsedRow
	})

	return parsedResult
}