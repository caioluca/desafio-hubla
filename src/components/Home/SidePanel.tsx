import styled from 'styled-components'

import { Card, Sellers, Upload } from '@/components'
import { useStore } from '@/hooks'

export function SidePanel() {
	const { user, transactions = [] } = useStore()

	return (
		<Container>
			{user?.role !== 'affiliate' && (
				<>
					<Upload />
					<Sellers />
				</>
			)}
			
			<Card label='Comissão do(s) Afiliado(s)' type='prejudice' />
			
			<Card label='Comissão do(s) Produtore(s)' type='profit' />
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
