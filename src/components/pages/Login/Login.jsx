import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../../../redux/slices/sessionSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import api from "../../../util/api";
import { notification } from "antd";

const Login = () => {
  /* A hook that is used to get the state of the store. */
  const accessToken = useSelector((state) => state.session.token);
  /* A hook that is used to set the state of the component. */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  /* A hook that is used to navigate to a different route. */
  const navigate = useNavigate();

  /**
   * If the name of the input is email, set the email state to the value of the input. If the name of
   * the input is password, set the password state to the value of the input.
   */
  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  /**
   * If the email and password are not empty, and the password is greater than 6 digits, then send a
   * post request to the server, and if the status is 201, then set the token and navigate to the home
   * page.
   * @returns {
   *   "message": "Error",
   *   "description": "Login fail"
   * }
   */
  const Access = async (e) => {
    e.preventDefault();

    if ([email, password === ""].includes("")) {
      notification.warning({
        message: "Info:",
        description: `All fields are required`,
      });
      return;
    } else if (password.length < 6) {
      notification.info({
        message: "Info:",
        description: "password must be greater than 6 digits",
      });
      return;
    }

    try {
      const { data, status } = await api({
        method: "post",
        url: "/user/login",
        data: {
          email,
          password,
        },
      });
      if (status === 201) {
        console.log(data);
        console.log(status);
        dispatch(setToken(data.token));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Error",
        description: "Login fail",
      });
    }
  };

  /* Checking if the accessToken is true, if it is, then navigate to the home page. */
  useEffect(() => {
    if (accessToken) navigate("/");
  }, [accessToken]);

  /* Returning the HTML code. */
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className=" px-16 py-12 mt-4 bg-white shadow-lg text-xl font-inter">
        <h3 className="text-center text-3xl">Login to your Account</h3>
        <form action="">
          <div className="mt-4">
            <div>
              <label className="block text-left" htmlFor="email">
                Email address
              </label>
              {/* A input field that is used to get the email of the user. */}
              <input
                type="text"
                name="email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none 
                          focus:ring-1 focus:ring-blue-600"
                onChange={handleChange}
                value={email}
              />
            </div>
            <div className="mt-4">
              <label className="block text-left">Password</label>
              {/* A input field that is used to get the password of the user. */}
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 mt-2 border rounded-md 
                           focus:outline-none focus:ring-1 focus:ring-blue-600"
                onChange={handleChange}
                value={password}
              />
            </div>
            <div className="flex items-baseline justify-between">
              {/* A button that is used to login to the account. */}
              <button
                className="px-6 py-2 mt-4 text-white bg-blue-600 
                            rounded-lg hover:bg-blue-800"
                onClick={Access}
              >
                Login
              </button>
              <Link
                to="/Register"
                className="text-blue-600 text-2xl hover:text-blue-800"
              >
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
