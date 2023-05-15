import styled from 'styled-components'

import { Card, Select, Upload } from '@/components'
import { IOption, ISelectProps } from '@/types'
import { useStore } from '@/hooks'
import { useEffect, useState } from 'react'
import { translateRole, formatCurrency, handleOutcomeNCommission } from '@/utils'

export function SidePanel() {
	const { user, transactions = [] } = useStore()
	const [options, setOptions] = useState<any>([])
	const [selectedOption, setSelectedOption] = useState<IOption>()
	const [producers, setProducers] = useState<Array<string>>([])
	const [sellers, setSellers] = useState<any>([])

	const [commission, setCommission] = useState('')
	const [profit, setProfit] = useState('')

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
		setSelectedOption({ label: user?.username, name: user.username })

		setOptions([
			user?.role === 'admin' ? {} : { label: user?.username, name: user.username },
			...sellers?.map((seller: any) => ({ label: seller, name: seller }))
		])
	}, [sellers])

	useEffect(() => {
		if (transactions?.length) {
			const result = handleOutcomeNCommission({ transactions, user, type: 'load' })
			const { outcome, commission } = result

			setProfit(formatCurrency(user?.role === 'affiliate' ? commission : outcome - commission))
			setCommission(formatCurrency(user?.role === 'affiliate' ? outcome - commission : commission))
		}
	}, [transactions])

	function handleSelectChange(option: IOption) {
		setSelectedOption(option)

		if (transactions?.length && !!selectedOption) {
			const result = handleOutcomeNCommission({ transactions, option, producers, type: 'click' })
			const { outcome, commission } = result
			
			setCommission(formatCurrency(commission))
			setProfit(formatCurrency(outcome - commission))
		}
	}

	return (
		<Container>
			{user?.role !== 'affiliate' && (
				<>
					<Upload />
					{!!transactions?.length && (
						<Sellers 
							placeholder={user?.role === 'admin' ? 'Todos' : user?.username}
							options={options} 
							onChange={handleSelectChange}
						/>
					)}
				</>
			)}
			
			{(!!transactions?.length) && (
				<>
					<Card
						label='Comissão do(s) Afiliado(s)'
						type='prejudice' 
						value={commission}
					/>
					<Card 
						label='Comissão do(s) Produtore(s)'
						type='profit' 
						value={profit} 
					/>
				</>
			)}
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

const Sellers = styled(Select).attrs<any>({
	listStyle: {
		top: 68, 
		padding: '21px 24px', 
		borderRadius: 20
	}
})<ISelectProps>`
	background-color: #1D1D41;
	padding: 21px 24px;
	border-radius: 20px;
`
