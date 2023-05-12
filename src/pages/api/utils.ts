import { ITransaction } from '@/providers/Context/types'

type TType = '1' | '2' | '3' | '4'

export function parser(file: string): Array<ITransaction> {
	const result = file.split(/\r?\n|\r|\n/g)

	if (!result[result.length - 1])
		result.pop()

	const parsedResult = result.map((row: string) => {
		const parsedRow = {
			type: row.slice(0, 0 + 1) as TType, 
			date: new Date(row.slice(1, 1 + 25)), 
			product: row.slice(26, 26 + 30), 
			value: row.slice(56, 56 + 10), 
			seller: row.slice(66, 66 + 20), 
		}

		return parsedRow
	})

	return parsedResult
}
