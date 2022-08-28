import { useState } from 'react'

const TodoInput = ({ addTodo }) => {
  const [title, setTitle] = useState ('')

  const handleTodo = (e) => {
    if(e.key.toLoweCase() === 'enter'){
      addTodo(title)
      setTitle('')
    }
  }

  return (
    <div className='mt-6 relative'>
        <input 
            type="text"
            className='focus:shadow-lg font-inter focus:shadow-blue-800 pl-12 w-full py-4 bg-gray-700 rounded-xl outline-none transition-all duration-300 ease-in-out' 
            placeholder='Add something to'
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyDown={e => handleTodo(e)}
        />
    </div>
  )
}

export default TodoInput