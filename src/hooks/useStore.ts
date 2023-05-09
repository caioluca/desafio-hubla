import { useContext } from 'react'
import { Context } from '@/providers/Context'

export function useStore() {
	return useContext(Context)
}
