import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Icon } from '@/components'
import { ICardProps } from '@/types'
import { useStore } from '@/hooks'
import { handleOutcomeNCommission, formatCurrency } from '@/utils'

export function Card({ label, type }: ICardProps) {
	const { selectedSeller, transactions, user, sellers } = useStore()
	const [value, setValue] = useState<string>()
	const [producers, setProducers] = useState<Array<string>>([])

	useEffect(() => {
		if (transactions?.length) {
			const result = handleOutcomeNCommission({ transactions, user, type: 'load' })
			const { outcome, commission } = result

			if (type === 'prejudice') {
				const newValue = user?.role === 'affiliate' ? commission : outcome - commission
				setValue(formatCurrency(newValue))
			}
			else {
				const newValue = user?.role === 'affiliate' ? outcome - commission : commission
				setValue(formatCurrency(newValue))
			}
		}
	}, [transactions])

	useEffect(() => {
		if (transactions?.length && !!selectedSeller) {
			const result = handleOutcomeNCommission({ transactions, option: selectedSeller, producers, type: 'change' })
			const { outcome, commission } = result
			
			if (type === 'prejudice')
				setValue(formatCurrency(commission))
			else 
				setValue(formatCurrency(outcome - commission))
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
				<Value children={value} />
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
