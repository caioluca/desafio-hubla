import Image, { ImageProps } from 'next/image'

import { TIconsNames } from '@/types'

interface IIconProps extends Omit<ImageProps, 'src'| 'alt' | 'width' | 'height'> {
	src?: string
	alt?: string
	width?: number
	height?: number
	size?: number
	name: TIconsNames
}

export function Icon(props: IIconProps) {
	const {
		name, 
		width, 
		height, 
		size = 20, 
	} = props

	return (
		<Image
			{...props} 
			src={`/svgs/${name}.svg`} 
			alt={name} 
			width={width || size} 
			height={height || size}
		/>
	)
}
