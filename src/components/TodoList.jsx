import Todo from "./Todo";
import TodoFilters from "./TodoFilters";

/* Destructuring the props object. */
const TodoList = ({
  todos,
  activeFilter,
  handleSetComplete,
  handleDelete,
  handleClearComplete,
  showAllTodos,
  showActiveTodos,
  showCompletedTodos,
}) => {
  return (
    <div className="flex flex-col mt-7 rounded-lg overflow-hidden shadow-2xl">
      {/* Mapping over the todos array and returning a Todo component for each todo. */}
      {todos.map((todo) => {
        return (
          <Todo
            key={todo.id}
            todo={todo}
            handleDelete={handleDelete}
            handleSetComplete={handleSetComplete}
          />
        );
      })}

      {/* Passing props to the TodoFilters component. */}
      <TodoFilters
        activeFilter={activeFilter}
        total={todos.length}
        showAllTodos={showAllTodos}
        showActiveTodos={showActiveTodos}
        showCompletedTodos={showCompletedTodos}
        handleClearComplete={handleClearComplete}
      />
    </div>
  );
};

export default TodoList;
