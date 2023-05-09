import { ReactNode } from "react"
import { ContextProvider } from './Context'

interface IProvidersProps {
	children: ReactNode
}

export function Providers({ children }: IProvidersProps) {
	return (
		<ContextProvider>
			{children}
		</ContextProvider>
	)
}