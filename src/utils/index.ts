import { ITransaction } from '@/types'

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


export function formatDate(inputDate: Date) {
  const date = new Date(inputDate)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = date.getMinutes()

  const formattedDay = day < 10 ? `0${day}` : day
  const formattedMonth = month < 10 ? `0${month}` : month
  const formattedHours = hours < 10 ? `0${hours}` : hours
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

  const dateStr = `${formattedDay}/${formattedMonth}/${year}`
  const timeStr = `${formattedHours}:${formattedMinutes}`

  return `${dateStr} ${timeStr}`
}

export function formatCurrency(valueInCents: string) {
  const value = Number(valueInCents) / 100

  const currencyOptions = {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }
  const currencyString = value.toLocaleString('pt-BR', currencyOptions)

  return currencyString
}

export function validateForm(newUser: any, formType: string ) {
  if (!newUser?.username)
   throw new Error('O Campo "Usuário" é obrigatório!')

  if (newUser?.username?.length < 3)
    throw new Error('O Campo "Usuário" deve conter pelo menos 3 caracteres!')

  if (!newUser?.password)
   throw new Error('O Campo "Senha" é obrigatório!')

  if (newUser?.password?.length < 8)
    throw new Error('O Campo "Senha" deve conter pelo menos 8 caracteres!')

  if (formType === 'signup') {
    if (!newUser?.role)
      throw new Error('O Campo "Função" é obrigatório!')

    if (!newUser?.confirmPassword)
      throw new Error('O Campo "Confirmar Senha" é obrigatório!')

    if (newUser?.confirmPassword !== newUser?.password)
      throw new Error('O Campo "Confirmar Senha" deve ser igual ao campo "Senha"!')
  }
}
