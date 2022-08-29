import { useEffect, useState } from "react";
import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Navbar from "./components/Navbar";
import api from "./util/api";
import { useSelector } from "react-redux";
import { notification } from "antd";
import { AxiosError } from "axios";

function AppTodo() {
  const accessToken = useSelector((state) => state.session.token);
  const [todos, setTodos] = useState([]);

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

  useEffect(() => {
    if (accessToken) getTodoList();
  }, [accessToken]);

  const [activeFilter, setActiveFilter] = useState("all"); //Filter all from the list
  const [filteredTodos, setFilteredTodos] = useState(todos); //stock copy of all initials

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

  const handleClearComplete = async () => {
    try {
      const { status } = await api({
        method: "delete",
        url: `/todo/`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(status)
      if (status === 202) {
        notification.success({
          message: "Success",
          description: "Task deleted",
        });
      }
      if(status === 500){
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
  
  const showAllTodos = () => {
    setActiveFilter("all");
  };

  const showActiveTodos = () => {
    setActiveFilter("active");
  };

  const showCompletedTodos = () => {
    setActiveFilter("completed");
  };

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

  return (
    <div>
      <Navbar />

      <div className="bg-white m-h-screen h-full font-inter text-gray-100 flex items-center justify-center py-10 px-5">
        <div className="rounded-xl container flex flex-col max-w-xl">
          <Header />
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
