const Todo = ({ todo, handleSetComplete, handleDelete }) => {
  /* Destructuring the todo object. */
  const { id, title, date, completed } = todo;

  return (
    <div className=" flex items-center justify-between px-4 py-2 bg-gray-700 border-bborder-solid border-gray-600">
      <div className=" flex items-center">
        {/* A ternary operator. It is a shorthand way of writing an if/else statement. */}
        {completed ? (
          <div
            onClick={() => handleSetComplete(id, !completed)}
            className=" border border-solid bg-green-700 p-1 mr-3 rounded-md cursor-pointer select-none"
          >
            <img className="h-4 w-4" src="./check-icon.svg" alt="Check Icon" />
          </div>
        ) : (
          <span
            onClick={() => handleSetComplete(id, !completed)}
            className="border border-solid border-gray-500 rounded-md p-3 mr-3 cursor-pointer"
          ></span>
        )}
        {/* A ternary operator. It is a shorthand way of writing an if/else statement. */}
        <p className={"pl-1" + (completed && "text-indigo-300 line-through")}>
          {title}
          <br />
          {`Date Todo: ${date}`}
        </p>
      </div>
      {/* A button that deletes the todo. */}
      <img
        onClick={() => handleDelete(id)}
        className="h-5 w-5 cursor-pointer transition-all duration-300 ease-in select-none"
        src="/close-icon.svg"
        alt="Close Icon"
      />
    </div>
  );
};

export default Todo;
