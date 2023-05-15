import { createGlobalStyle } from 'styled-components'

export const Global = createGlobalStyle`
	* {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}

	html,
	body, 
	#__next {
		width: 100%;
		height: 100%;
		max-width: 100vw;
		font-family: var(--font-inter)
	}
`