import styled from 'styled-components'

import { Card, CardSelect, CardUpload } from '@/components'

export function SidePanel() {
	return (
		<Container>
			<CardUpload />
			<CardSelect />
			<Card mode='income' value='632.000' />
			<Card mode='outcome' value='632.000' />
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
