import { useState } from 'react'
import { notification } from "antd";

const TodoInput = ({ addTodo }) => {
  const [title, setTitle] = useState ('');
  const [date, setDate] = useState('');

  const handleAddTodo = (e) => {
    e.preventDefault();

    let day = new Date();
    let today = String(
      day.getFullYear() +
        "-" +
        String(day.getMonth() + 1).padStart(2, "0") +
        "-" +
        day.getDate()
    ).padStart(2, "0");

    if ([title, date].includes("")) {
      //All fields are required
      notification.warning({
        message: "Info:",
        description: `All fields are required`,
      });
    } else if (date < today) {
      //Date must be greater than today
      notification.warning({
        message: "Info:",
        description: `wrong date range`,
      });
    } else {
      addTodo(title, date);
      setTitle("");
      setDate("");
    }
  };

  const prevent = (e) => {
    if (e.key.toLowerCase() === "enter") {
      e.preventDefault();
    }
  };


  return (
    <div className="mt-3 relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"></div>
      <form onSubmit={handleAddTodo} className="bg-white rounded-lg mb-6 ">
        <input
          type="text"
          id="text"
          className="focus:shadow-md font-inter focus:shadow-indigo-300 pl-5 w-full py-4 bg-gray-700 rounded-xl outline-none transition-all duration-300 ease-in-out"
          placeholder="Insert something to do"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => prevent(e)}
        />

        <span className=" flex-wrap font-inter text-lg mr-4 text-black font-bold select-none w-2/4">
          Select a date to do:
        </span>

        <input
          type="date"
          id="date"
          className="pointer-events-auto focus:shadow-md font-inter  focus:shadow-indigo-300
                 p-6 flex-wrap w-sm py-2 my-1 bg-gray-700 rounded-xl text-white outline-none
                 transition-all duration-300 ease-in-out"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="submit"
          className="flex  absolute bg-gray-500 w-md px-6 py-2 mt-1 text-white uppercase font-bold 
                    hover:bg-gray-700 cursor-pointer rounded-lg transition-all"
          value="Add"
        />
      </form>
    </div>
  )
}

export default TodoInput