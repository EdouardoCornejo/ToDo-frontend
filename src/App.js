import { useState } from 'react';
import Title from './components/Title'
import TodoInput from './components/TodoInput';
import Todo from './components/Todo';
import TodoList from './components/TodoList';

function App() {

  const [todos, setTodos] = useState([
    
    {id: 1,
    title: 'watch movies on Netflix',
    competed: 'false',
    },
    {
      id: 1,
      title: 'watch movies on Prime Video',
      competed: 'false',
    },
    {
      id: 1,
      title: 'watch movies on Pluto Tv',
      competed: 'false',
    },

  ])

  return (
    <div className='bg-gray-900 min-h-screen h-full font-inter text-gray-100 flex items-center justify-center py-20 px-5'>
      <div className='container flex flex-col max-w-xl'>
        <Title/>   
        <TodoInput/>
          <TodoList todos={todos}/>
      </div>
    </div>
  );
}

export default App;
