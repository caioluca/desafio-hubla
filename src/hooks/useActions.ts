import { TYPES } from '@/providers/Context'
import { useStore } from '@/hooks'

export function useActions() {
	const { dispatch } = useStore()	


	function increment() {
		dispatch({ type: TYPES.INCREMENT })
	}

	function decrement() {
		dispatch({ type: TYPES.DECREMENT })
	}

	return {
		increment, 
		decrement, 
	}
}
