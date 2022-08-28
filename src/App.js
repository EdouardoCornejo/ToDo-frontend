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
  
  const addTodo = (title) => {
    const lastId = todos.length > 0 ? todos[todos.length - 1].id :1;

    const newTodo = {
      id: lastId +1,
      title,
      completed: false
    }

    const todoList = [...todos]
    todoList.push(newTodo);
    setTodos(todoList);
  }

  return (
    <div className='bg-gray-900 min-h-screen h-full font-inter text-gray-100 flex items-center justify-center py-20 px-5'>
      <div className='container flex flex-col max-w-xl'>
        <Title/>   
        <TodoInput addTodo={addTodo}/>
          <TodoList todos={todos}/>
      </div>
    </div>
  );
}

export default App;
