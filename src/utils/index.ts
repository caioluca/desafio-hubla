export function convertCents(value: string) {
	return parseFloat(value) / 100
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