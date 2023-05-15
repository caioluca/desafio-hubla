import styled from 'styled-components'

import { Card, Select as CSelect, Upload } from '@/components'
import { IOption, ISelectProps } from '@/types'
import { useActions, useStore } from '@/hooks'
import { useDeferredValue, useEffect, useState } from 'react'
import { formatCurrency } from '@/utils'

function handleRole(role?: string) {
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

export function SidePanel() {
	const { setAffiliates } = useActions()
	const { user, transactions = [], affiliates } = useStore()
	const [options, setOptions] = useState<any>([])
	const [selectedOption, setSelectedOption] = useState<IOption>()
	const [producers, setProducers] = useState<any>([])
	const [sellers, setSellers] = useState<any>([])
	const [defaultValue, setDefaultValue] = useState<any>()

	const [commission, setCommission] = useState('')
	const [profit, setProfit] = useState('')

	useEffect(() => {
		setSelectedOption(user?.role === 'producer' ? { label: handleRole(user?.role), name: user.username } : { label: sellers[0], name: sellers[0] })
	}, [user, sellers])

	useEffect(() => {
		setDefaultValue(user?.role === 'producer' ? { label: 'Produtor', name: selectedOption?.name } : selectedOption)
	}, [selectedOption])

	useEffect(() => {
		const affiliates = new Set<string>()
		const producers = new Set<string>()

		transactions
			.filter(({ type }) => type === '1')
			.map(({ seller }) => producers.add(seller))
		
			transactions.filter(({ seller }) => seller !== user.username)
			.map(({ seller, type }) => affiliates.add(seller))

		setSellers(Array.from(affiliates))
		setProducers(Array.from(producers))
	}, [transactions])

	useEffect(() => {
		setOptions([
			user?.role === 'admin' ? {} : { label: 'Produtor', name: user.username },
			...sellers?.map((seller: any) => ({ label: seller, name: seller }))
		])
	}, [sellers])

	useEffect(() => {
		if (transactions?.length) {
			const outcome = transactions
				?.filter(({ type }) => ['1', '2'].includes(type))
				?.map(({ value }) => parseFloat(value))
				?.reduce((prev, curr) => prev + curr)

			const commission = transactions
				?.filter(({ type }) => type === (user?.role === 'affiliate' ? '4' : '3'))
				?.map(({ value }) => parseFloat(value))
				?.reduce((prev, curr) => prev + curr)
				
			setProfit(formatCurrency(String(user?.role === 'affiliate' ? commission : outcome - commission)))
			setCommission(formatCurrency(String(user?.role === 'affiliate' ? outcome - commission : commission)))
		}
	}, [transactions])

	function handleSelectChange(option: IOption) {
		setSelectedOption(option)

		if (transactions?.length) {
			const outcome = transactions
				?.filter(({ seller, type, product }) => {
					if (producers?.includes(option?.name)) {
						const producer: any = transactions.find(({ seller, type }) => seller === option?.name && type === '1') || {}

						return producer?.product === product && ['1', '2'].includes(type)
					}
					else 
						return seller === option.name && type === '2'
				})
				?.map(({ value }) => parseFloat(value))
				?.reduce((prev, curr) => prev + curr)

			const commission = transactions
				?.filter(({ seller, type }) => {
					if (producers?.includes(option?.name))
						return seller === option.name && type === '3'
					else 
						return seller === option.name && type === '4'
				})
				?.map(({ value }) => parseFloat(value))
				?.reduce((prev, curr) => prev + curr)

			setProfit(formatCurrency(String(option?.label !== 'Produtor' ? commission : outcome - commission)))
			setCommission(formatCurrency(String(option?.label !== 'Produtor' ? outcome - commission : commission)))
		}
	}

	return (
		<Container>
			{user?.role !== 'affiliate' && (
				<>
					<Upload />
					<Select 
						options={options} 
						onChange={handleSelectChange}
						defaultValue={{ label: user?.role === 'producer' ? 'Produtor' : selectedOption?.name, name: selectedOption?.name }}
					/>
				</>
			)}
			
			<Card
				label={selectedOption?.label === 'Produtor' ? 'Comissão dos Afiliados' : 'Comissão do Produtor'} 
				type='prejudice' 
				value={commission}
			/>
			<Card 
				label={user?.role === 'admin' ? 'Comissão Afiliado' : 'Saldo Final'} 
				type='profit' 
				value={profit} 
			/>
		</Container>
	)
}

const Container = styled.div`
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 26px;

	@media screen and (max-width: 768px) {
		max-width: unset;
	}
`

const Select = styled(CSelect).attrs<any>({
	listStyle: {
		top: 68, 
		padding: '21px 24px', 
		borderRadius: 20, 
	}
})<ISelectProps>`
	background-color: #1D1D41;
	padding: 21px 24px;
	border-radius: 20px;
`
