import styled from 'styled-components'

import { Select as CSelect } from '@/components'
import { useActions, useStore } from '@/hooks'

const options = [
	{ label: 'Sair', name: 'logout' },
]

export function Profile() {
	const { logout, toggleIsMenuOpen } = useActions()
	const { user } = useStore()

	async function handleChange() {
		try {
			await logout()

			toggleIsMenuOpen()
		} catch (error) {
			console.log(error)
		}
	}

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

	return (
		<Select options={options} onChange={handleChange}>
			<Info>
				<Username children={user?.username?.toUpperCase()} />
				<Role children={handleRole(user?.role)} />
			</Info>
		</Select>
	)
}

const Select = styled(CSelect).attrs<any>({
	rightIcon: {
		name: 'up-arrow'
	}, 
	listStyle: {
		top: 'unset',
		bottom: 65
	}
})`
	background: none;
`

const Info = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2px;
`

const Username = styled.span`
	font-family: Inter;
	font-style: normal;
	font-weight: 700;
	font-size: 20px;
	line-height: 24px;
	color: #FFFFFF;
`

const Role = styled.span`
	font-family: Inter;
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	color: #F0F0FB;
`
