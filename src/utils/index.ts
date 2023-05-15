import {
  IHandleOutcomeNComissionParams, 
  ITransaction, 
  TTransactionType, 
  ISumTransactionsValueParams, 
  IHandleOutcomeNCommissionReturn
} from '@/types'

function formatTransactionCB(transaction: ITransaction): ITransaction {
  const { date, value, ...rest } = transaction

  return {
    ...rest, 
    date: formatDate((date as Date)), 
    value: formatCurrency(value), 
  }
}

interface IFilterBySearchTermCBParams {
  transaction: ITransaction
  searchTerm: string
}

function filterBySearchTermCB(params: IFilterBySearchTermCBParams) {
  const { transaction, searchTerm } = params
  const { type, date, product, value, seller } = transaction
  
  return (
    type.match(RegExp(searchTerm, 'ig')) || 
    (date as string).match(RegExp(searchTerm, 'ig')) || 
    product.match(RegExp(searchTerm, 'ig')) || 
    (value as string).match(RegExp(searchTerm, 'ig')) || 
    seller.match(RegExp(searchTerm, 'ig'))
  )
}

interface IFilterTransactionsParams {
  transactions: Array<ITransaction>
  searchTerm: string
}

export function filterTransactions(params: IFilterTransactionsParams) {
  const { transactions, searchTerm } = params

  return (
    transactions
      ?.map(formatTransactionCB)
      ?.filter((transaction) => filterBySearchTermCB({ transaction, searchTerm }))
  )
}

export function translateRole(role?: string): string {
	switch (role) {
		case 'admin':
			return 'Adiministrador'

		case 'producer':
			return 'Produtor'
			
		case 'affiliate':
			return 'Afiliado'
	
		default:
			return ''
	}
}

function sumTransactionsValue(params: ISumTransactionsValueParams): number {
  const { transactions, filter } = params

  const values = transactions?.filter(filter)?.map(({ value }) => parseFloat(value as string))
  if (!!values.length)  
    return values?.reduce((prev, curr) => prev + curr)

  return 0
}

export function handleOutcomeNCommission(params: IHandleOutcomeNComissionParams): IHandleOutcomeNCommissionReturn {
  const { transactions, user, type, producers, option } = params
  let result = { outcome: 0, commission: 0 }

    if (type === 'load') {
      const outcome = sumTransactionsValue({ transactions, filter: ({ type }) => ['1', '2'].includes(type) })
      const commission = sumTransactionsValue({ transactions, filter: ({ type }) => type === (user?.role !== 'producer' ? '4' : '3') })

      result = { outcome, commission }
    }

    if (type === 'click' && !!option) {
      const outcome = sumTransactionsValue({ 
        transactions, 
        filter: ({ product, seller, type }) => {
          if (producers?.includes(option?.name)) {
            const producer: any = transactions.find(({ seller, type }) => seller === option?.name && type === '1') || {}

            return producer?.product === product && ['1', '2'].includes(type)
          }
          else 
            return seller === option.name && type === '2'
        } 
      })

      const commission = sumTransactionsValue({
        transactions, 
        filter: ({ seller, type }) => {
          if (producers?.includes(option?.name))
            return seller === option.name && type === '3'
          else 
            return seller === option.name && type === '4'
        }
      })

      result = { outcome, commission }
    }

  return result
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

export function formatCurrency(valueInCents: string | number) {
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
