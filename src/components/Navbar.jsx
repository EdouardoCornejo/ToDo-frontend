import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logout } from "../redux/slices/sessionSlice";
import { PoweroffOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";

const Navbar = () => {
  const accessToken = useSelector((state) => state.session.token);
  const dispatch = useDispatch(accessToken);
  const [loadings, setLoadings] = useState([]);


  const enterLoading = (index) => {                 // Function LogOut
    setLoadings(prevLoadings => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings(prevLoadings => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings && dispatch(logout());
      });
    }, 2000);
  };

  return (
    <div className="mt-0 relative flex flex-row py-4 bg-gray-100 ">
      <Space style={{ width: "100%" }}>
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
