const TodoInput = () => {
  return (
    <div className='mt-6 relative'>
        <input 
            type="text"
            className='focus:shadow-lg font-inter focus:shadow-blue-800 pl-12 w-full py-4 bg-gray-700 rounded-xl outline-none transition-all duration-300 ease-in-out' 
            placeholder='Add something to'
        />
    </div>
  )
}

export default TodoInput