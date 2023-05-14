import styled from 'styled-components'

import { Select as CSelect } from '@/components'
import { useActions, useStore } from '@/hooks'
import { useRouter } from 'next/router'

const options = [
	{ label: 'Sair', name: 'logout' },
]

export function Profile() {
	const { logout } = useActions()
	const router = useRouter()
	const { user } = useStore()

	async function handleChange() {
		try {
			await logout()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Select options={options} onChange={handleChange}>
			<Info>
				<Username children={user?.username?.toUpperCase()} />
				<Role children={user?.role} />
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
