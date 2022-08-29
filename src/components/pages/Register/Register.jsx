import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../../util/api";
import { notification } from "antd";
import { useSelector } from "react-redux";

const Register = () => {
  const accessToken = useSelector((state) => state.session.token);
  useEffect(() => {
    if (accessToken) navigate("/");
  }, [accessToken]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    }
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const register = async () => {
    try {
      const { status } = await api({
        method: "post",
        url: "/user/register",
        data: {
          name,
          email,
          password,
        },
      });
      if (status === 200) {
        notification.success({
          message: "Success",
          description: `User Register`,
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        throw new Error(`The user did not register, check the data.`);
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: `The user did not register, check the data.`,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className=" px-16 py-12 mt-4 bg-white shadow-lg text-xl font-inter">
        <h3 className="text-center text-3xl">Register your Account</h3>
        <div className="mt-4">
          <div>
            <label className="block text-left">Name</label>
            <input
              name="name"
              placeholder="Name"
              type="text"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <label className="block text-left" htmlFor="email">
              Email
            </label>
            <input
              name="email"
              placeholder="Email"
              type="text"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              onChange={handleChange}
              value={email}
            />
          </div>
          <div className="mt-4">
            <label className="block text-left">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-baseline justify-between">
            <button
              className="px-6 py-2 mt-4 text-white bg-blue-600 
                    rounded-lg hover:bg-blue-800"
              onClick={register}
            >
              Register
            </button>
            <Link
              to="/"
              className=" text-blue-600 text-2xl hover:text-blue-800"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
