import { useEffect } from 'react'
import styled from 'styled-components'

import { IOption, ISelectProps } from '@/types'
import { Select as CSelect } from '@/components'
import { useActions, useStore } from '@/hooks'

export function Sellers() {
	const { sellers, transactions, user } = useStore()
	const { setSelectedSeller, setSellers } = useActions()

	useEffect(() => {
		if (!!transactions?.length) {
			let unrepeatedSellers: any = new Set<string>()

			transactions?.map(({ seller }) => unrepeatedSellers.add(seller))
				
			unrepeatedSellers = Array.from(unrepeatedSellers).map((seller) => ({ label: seller, name: seller }))

			setSellers(unrepeatedSellers)
		}
	}, [transactions])

	useEffect(() => {
		setSelectedSeller({ label: user?.username, name: user.username })
	}, [user])

	function handleSelectChange(seller: IOption) {
		setSelectedSeller(seller)
	}

	return !transactions?.length ? <></> : (
		<Select 
			placeholder={user?.role === 'admin' ? 'Todos' : user?.username}
			options={sellers} 
			onChange={handleSelectChange}
		/>
	)
}

const Select = styled(CSelect).attrs<any>({
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
