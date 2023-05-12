import styled from 'styled-components'

import { Card, Select as CSelect, Upload } from '@/components'
import { ISelectProps } from '@/types'

const options = [
	{ label: 'Produtor', name: 'producer' },
]

export function SidePanel() {
	return (
		<Container>
			<Upload />

			<Select options={options} />
			
			<Card type='income' value='632.000' />
			<Card type='outcome' value='632.000' />
		</Container>
	)
}

const Container = styled.div`
  width: 100%;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  gap: 26px;
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
