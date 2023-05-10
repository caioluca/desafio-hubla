import Image from 'next/image'
import styled from 'styled-components'

export function Profile() {
	return (
		<Container>
			<Info>
				<Avatar />
				<InfoText>
					<Username children='Alia Riaz' />
					<Role children='Web Developer' />
				</InfoText>
			</Info>
			<DownArrow />
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
`
const Info = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
`

const Avatar = styled(Image).attrs({
	src: '/avatar.png',
	alt: 'avatar',
	width: 60,
	height: 60,
})`
	background-color: #fff;
	border-radius: 50%;
`

const InfoText = styled.div`
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

const DownArrow = styled(Image).attrs({
	src: '/down-arrow.svg',
	alt: 'down-arrow',
	width: 12,
	height: 7,
})``