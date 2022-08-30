import { useEffect, useState } from "react";
import Title from "./components/Title";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Navbar from "./components/Navbar";
import api from "./util/api";
import { useSelector } from "react-redux";
import { AxiosError } from "axios";
import { notification } from "antd";

function AppTodo() {
  /* Getting the accessToken from the redux store and setting the todos state to an empty array. */
  const accessToken = useSelector((state) => state.session.token);
  const [todos, setTodos] = useState([]);

  // getTodoList
  /**
   * It's an async function that makes a GET request to the /todo endpoint, and sets the response data
   * to the todos state.
   */
  const getTodoList = async () => {
    try {
      const { data } = await api({
        method: "Get",
        url: "/todo",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  /* It's a react hook that runs the getTodoList function when the accessToken changes. */
  useEffect(() => {
    if (accessToken) getTodoList();
  }, [accessToken]);

  /* It's a react hook that sets the activeFilter state to "all" and the filteredTodos state to the
 todos state. */
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState(todos);

  // addTodo
  /**
   * It adds a todo to the database and then updates the state of the todos.
   * @param title - string
   * @param date - "2020-05-05T00:00:00.000Z"
   */
  const addTodo = async (title, date) => {
    try {
      const { data, status } = await api({
        method: "post",
        url: "/todo",
        data: {
          title,
          date,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (status === 201) {
        notification.success({
          message: "Success",
          description: `Task added`,
        });
        if (status === 401) {
          throw new AxiosError();
        }
        setTodos((previous) => [...previous, data]);
      }
    } catch (error) {
      if (AxiosError) {
        notification.warning({
          message: "Unauthorized",
          description: `Task not added`,
        });
      } else {
        notification.error({
          message: "Error",
          description: `Task not added `,
        });
      }
    }
  };

  // handleSetComplete
  /**
   * It takes an id and a completed boolean and updates the todo with the given id to the given
   * completed boolean.
   * @param id - the id of the todo item
   * @param completed - boolean
   */
  const handleSetComplete = async (id, completed) => {
    try {
      const { status } = await api({
        method: "Put",
        url: `/todo/${id}`,
        data: {
          completed,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (status === 401) {
        throw new AxiosError();
      }
    } catch (error) {
      if (AxiosError) {
        notification.error({
          message: "Error",
          description: `task not completed `,
        });
      }
    }
    const updatedList = await todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedList);
  };

  // HandleDelete
  /**
   * It deletes a todo item from the database and then filters the todo list to remove the deleted
   * item.
   * @param id - the id of the todo item
   */
  const handleDelete = async (id) => {
    // Filter to remove all
    try {
      const { status } = await api({
        method: "delete",
        url: `/todo/${id}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (status === 202) {
        notification.success({
          message: "Success",
          description: "Task deleted",
        });
      }
      if (status === 401) {
        throw new AxiosError();
      }
    } catch (error) {
      if (AxiosError) {
        notification.warning({
          message: "Unauthorized",
          description: `Task not deleted`,
        });
      } else {
        console.log(error);
        notification.error({
          message: "Error",
          description: "Task not deleted",
        });
      }
    }
    const updatedList = todos.filter((todo) => todo.id !== id);
    setTodos(updatedList);
  };

  // handleClearComplete
  /**
   * It deletes all the completed tasks from the database and updates the todo list.
   * </code>
   */
  const handleClearComplete = async () => {
    try {
      const { status } = await api({
        method: "delete",
        url: `/todo/`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(status);
      if (status === 202) {
        notification.success({
          message: "Success",
          description: "Task deleted",
        });
      }
      if (status === 500) {
        throw new AxiosError();
      }
    } catch (error) {
      if (AxiosError) {
        notification.warning({
          message: "Unauthorized",
          description: `You don't have completed tasks to delete`,
        });
      } else {
        notification.error({
          message: "Error",
          description: "Task not deleted",
        });
      }
    }
    const updatedList = todos.filter((todo) => !todo.completed);
    setTodos(updatedList);
  };

  /**
   * It sets the active filter to 'all'
   */
  const showAllTodos = () => {
    setActiveFilter("all");
  };

  /**
   * When the user clicks the 'Active' button, the active filter is set to 'active'.
   */
  const showActiveTodos = () => {
    setActiveFilter("active");
  };

  /**
   * When the user clicks the button, the activeFilter state is set to 'completed'.
   */
  const showCompletedTodos = () => {
    setActiveFilter("completed");
  };

  /* It's a react hook that runs the getTodoList function when the accessToken changes. */
  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredTodos(todos);
    } else if (activeFilter === "active") {
      const activeTodos = todos.filter((todo) => todo.completed === false);
      setFilteredTodos(activeTodos);
    } else if (activeFilter === "completed") {
      const completedTodos = todos.filter((todo) => todo.completed === true);
      setFilteredTodos(completedTodos);
    }
  }, [activeFilter, todos]);

  /* It's returning the JSX that will be rendered on the screen. */
  return (
    <div>
      <Navbar />

      <div className="bg-white m-h-screen h-full font-inter text-gray-100 flex items-center justify-center py-10 px-5">
        <div className="rounded-xl container flex flex-col max-w-xl">
          {/* It's rendering the Title, TodoInput and TodoList components. */}
          <Title />
          <TodoInput addTodo={addTodo} />
          <TodoList
            todos={filteredTodos}
            activeFilter={activeFilter}
            handleSetComplete={handleSetComplete}
            handleDelete={handleDelete}
            showAllTodos={showAllTodos}
            showActiveTodos={showActiveTodos}
            showCompletedTodos={showCompletedTodos}
            handleClearComplete={handleClearComplete}
          />
        </div>
      </div>
    </div>
  );
}

export default AppTodo;
