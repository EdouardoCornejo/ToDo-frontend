import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logout } from "../redux/slices/sessionSlice";
import { PoweroffOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";

const Navbar = () => {
  /* Getting the token from the redux store. */
  const accessToken = useSelector((state) => state.session.token);
  /* A redux hook that is used to dispatch actions to the redux store. */
  const dispatch = useDispatch(accessToken);
  /* A state hook that is used to set the loading state of the button. */
  const [loadings, setLoadings] = useState([]);

  /**
   * When the user clicks the logout button, the loading icon will appear for 2 seconds and then the
   * user will be logged out.
   */
  const enterLoading = (index) => {
    // Function LogOut
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings && dispatch(logout());
      });
    }, 2000);
  };

  /* Returning the HTML code. */
  return (
    <div className="mt-0 relative flex flex-row py-4 bg-gray-100 ">
      <Space style={{ width: "100%" }}>
        {/* A button that is used to logout the user. */}
        <Button
          type="primary"
          icon={<PoweroffOutlined />}
          loading={loadings[1]}
          className="flex w-md px-6 py-2 mt-auto ml-24 uppercase"
          onClick={() => enterLoading(1)}
        >
          Logout
        </Button>
      </Space>
    </div>
  );
};

export default Navbar;
