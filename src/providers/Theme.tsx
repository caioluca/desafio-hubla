import { ReactNode } from 'react'
import { ThemeProvider as SCThemeProvider } from 'styled-components'

interface ITheme {
	color: {
		background: {
			primary: string
			secondary: string
			tertiary: string
			quaternary: string
			quinary: string
			toast: {
				success: string
				warning: string
				error: string
			}
		},
		text: {
			primary: string
			secondary: string
			tertiary: string
			quaternary: string
			quinary: string
			senary: string
		}
	}, 
	font: {
		sizes: {
			small: string
			regular: string
			regularx: string
			big: string
			bigx: string
			bigxx: string
		},
		heights: {
			small: string
			regular: string
			regularx: string
			big: string
			bigx: string
			bigxx: string
			huge: string
			hugex: string
		},
		weights: {
			regular: string
			semiBold: string
			bold: string
		}
	}
}

const theme: ITheme = {
	color: {
		background: {
			primary: '#141332', 
			secondary: '#1d1d41', 
			tertiary: '#4b4b99', 
			quaternary: '#6359e9', 
			quinary: '#27264e', 
			toast: {
				success: '#55b938', 
				warning: '#eac645', 
				error: '#d65745', 
			}
		},
		text: {
			primary: '#FFF', 
			secondary: '#706e98', 
			tertiary: '#8c89b4', 
			quaternary: '#f0f0fb', 
			quinary: '#aeabd8', 
			senary: '#6359e9', 
		}
	}, 
	font: {
		sizes: {
			small: '14px', 
			regular: '16px', 
			regularx: '18px', 
			big: '20px', 
			bigx: '24px', 
			bigxx: '30px', 
		},
		heights: {
			small: '12px', 
			regular: '15px', 
			regularx: '17px', 
			big: '19px', 
			bigx: '20px', 
			bigxx: '24px', 
			huge: '29px', 
			hugex: '34px', 
		},
		weights: {
			regular: '400', 
			semiBold: '600', 
			bold: '700', 
		}
	}
}


interface IThemeProviderProps {
	children: ReactNode
}

export function ThemeProvider({ children }: IThemeProviderProps) {
	return (
		<SCThemeProvider theme={theme}>
			{children}
		</SCThemeProvider>
	)
}