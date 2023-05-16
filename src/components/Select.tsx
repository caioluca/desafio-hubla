import { useState } from 'react'
import styled from 'styled-components'

import { Icon } from '@/components'

import { ISelectProps, IOption } from '@/types'

export function Select(props: ISelectProps) {
	const {
    options, 
    leftIcon, 
    rightIcon, 
    placeholder = '', 
    listStyle, 
    listItemStyle, 
    children, 
    onChange,
    ...rest
  } = props

	const [isListVisible, setIsListVisible] = useState(false)
	const [selectedOption, setSelectedOption] = useState<IOption>()


	function toggleIsListVisible() {
		setIsListVisible(!isListVisible)
	}

  function handleItemClick(option: IOption) {
    if (onChange)
      onChange(option)
      
    setSelectedOption(option)
  }

	return (
		<Container {...rest} onClick={toggleIsListVisible}>
			<LeftContent>
				{leftIcon && <Icon {...leftIcon} />}
				<Label
					name={selectedOption?.name}
				>
          {children ? children : selectedOption?.label ? selectedOption?.label : placeholder ? placeholder : 'Selecione'}
        </Label>
			</LeftContent>
			{rightIcon ? <Icon {...rightIcon} /> : <Icon name='down-arrow' />}

			{isListVisible && (
				<List style={listStyle}>
					{options?.filter(({ label }) => !!label)?.map((option, index) => (
						<ListItem
							key={index} 
              style={listItemStyle}
							onClick={() => handleItemClick(option)} 
							children={option.label}
						/>
					))}
				</List>
			)}
		</Container>
	)
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 13px;
  background: #27264E;
  border-radius: 10px;
  width: 100%;
  position: relative;
  cursor: pointer;
  justify-content: space-between;
`

const LeftContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const Label = styled.span<{ name?: string }>`
  font-size: 16px;
  line-height: 20px;
  user-select: none;
  color: ${({ name }) => !!name ? '#AEABD8' : '#706e98'};
`

const List = styled.ul`
  width: 100%;
  position: absolute;
  top: 45px;
  left: 0;
  padding: 10px 13px;
  list-style: none;
  background: #27264E;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 13px;
  z-index: 1;
`

const ListItem = styled.li`
  font-weight: 400;
  font-size: 16px;
  line-height: 15px;
  color: #706e98;
  user-select: none;  
  &:hover {
    color: #AEABD8;
  }
`
