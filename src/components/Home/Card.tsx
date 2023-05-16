import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import { Icon } from '@/components'
import { ICardProps } from '@/types'
import { useStore } from '@/hooks'
import { handleOutcomeNCommission, formatCurrency } from '@/utils'

export function Card({ label, type }: ICardProps) {
	const { selectedSeller, transactions, user, sellers } = useStore()
	const [value, setValue] = useState<any>()
	const [producers, setProducers] = useState<Array<string>>([])
	
	const defaultValue = useMemo(() => {
		const result = handleOutcomeNCommission({ transactions, user, type: 'load' })
		const { outcome, commission } = result
		let value  
		
		if (type === 'profit') {
			const newValue = user?.role === 'affiliate' ? commission : outcome - commission
			value = newValue
		}
		else {
			const newValue = user?.role === 'affiliate' ? outcome - commission : commission
			value = newValue
		}

		return value
	}, [transactions, user])
	

	useEffect(() => {
		if (transactions?.length && !!selectedSeller) {
			const result = handleOutcomeNCommission({ transactions, option: selectedSeller, producers, type: 'change' })
			const { outcome, commission } = result
			
			if (type === 'prejudice')
				setValue(commission)
			else 
				setValue(outcome - commission)
		}
	}, [selectedSeller])

	useEffect(() => {
		const unrepeatedProducers = new Set<string>()
		
		transactions
			?.filter(({ type }) => type === '1')
			?.map(({ seller }) => unrepeatedProducers.add(seller))

		setProducers(Array.from(unrepeatedProducers))
	}, [sellers])

	return (
		<Container>
			<Icon name={type} size={45} />
			<Info>
				<Label children={label} />
				<Value children={formatCurrency(value || defaultValue)} />
			</Info>
		</Container>
	)
}

const Container = styled.div`
	background-color: #1D1D41;
	border-radius: 20px;
	padding: 41px 24px;
	display: flex;
	align-items: center;
	gap: 23px;
`

const Info = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`

const Label = styled.span`
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	color: #8C89B4;
`

const Value = styled.span`
	font-weight: 600;
	font-size: 24px;
	line-height: 29px;
	color: #FFFFFF;
`
