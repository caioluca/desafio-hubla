import { IronSessionOptions } from 'iron-session'
import { IUserSession } from '@/types'

export const sessionOptions: IronSessionOptions = {
	password: process.env.SECRET_COOKIE_PASSWORD as string,
	cookieName: 'iron-session/desafio-hubla',
	cookieOptions: {
		secure: process.env.NODE_ENV === 'production',
	}
}

declare module 'iron-session' {
	interface IronSessionData {
		user?: IUserSession
	}
}