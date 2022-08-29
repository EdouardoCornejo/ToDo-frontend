import TodoFilters from "./TodoFilters"
import Todo from "./Todo"

const TodoList = ({ 
  todos, 
  handleSetComplete, 
  handleDelete, 
  activeFilter, 
  showAllTodos, 
  showActiveTodos, 
  showCompletedTodos,
  handleClearComplete
 }) => {

  return (
    <div className='flex flex-col mt-7 rounded-lg overflow-hidden shadow-2xl'>
        {todos.map(todo => {
          return (
            <Todo 
              key={todo.id} 
              todo={todo}
              handleDelete={handleDelete}
              handleSetComplete={handleSetComplete}
            />
          )
         })}
        <TodoFilters
          activeFilter={activeFilter}
          total={todos.length}
          showAllTodos={showAllTodos}
          showActiveTodos={showActiveTodos}
          showCompletedTodos={showCompletedTodos}
          handleClearComplete={handleClearComplete}
        />
    </div>
  )
}

export default TodoList