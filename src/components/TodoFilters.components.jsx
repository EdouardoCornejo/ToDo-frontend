import React from 'react'

const FiltersContainer = ({children}) => {
  return (
    <div className='flex items-center justify-between p-4 bg-gray-700 border-b border-solid border-gray-600'>
        {children}
    </div>
  )
}

const ItemsLeft = ({total = 0}) => {
    return(
        <p className='text-gray-400 text-sm'>
            {total} Items left
        </p>
    )
}

const FilterButtonContainer = ({children}) => {
    return(
        <div className='flex items-center space-x-2'>
            {children}
        </div>
    )
}

export {FiltersContainer, ItemsLeft, FilterButtonContainer}