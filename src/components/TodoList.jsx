import TodoFilters from "./TodoFilters"
import Todo from "./Todo"

const TodoList = ({todos}) => {
  return (
    <div className='flex flex-col mt-7 rounded-lg overflow-hidden shadow-2xl'>
        {todos.map(todo => {
          return (
            <Todo 
              key={todo.id} 
              todo={todo}/>
          )
         })}
        <TodoFilters/>
    </div>
  )
}

export default TodoList