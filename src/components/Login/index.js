import "./index.css";
import { useRef } from "react";
import { Button, Form, Input, Select } from "antd";
import { loginUser } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const passwordRef = useRef();
  const numberRef = useRef();
  const typeRef = useRef();

  const adminData = useSelector((state) => state.admin);
  const employeesData = useSelector((state) => state.employees);

  const validateAdmin = (num, pass) => {
    return adminData.phone === num && adminData.password === pass
      ? true
      : false;
  };

  const validateEmployee = (num, pass) => {
    const user = employeesData.filter((item) => item.phone === num);
    if (user.length > 0) {
      if (user[0].phone === num && user[0].password === pass) {
        return { user: user[0].e_id, type: "employee" };
      } else {
        console.log("employee passsword doesn't match");
      }
    } else {
      return false;
    }
  };

  const handleSubmit = () => {
    const password = passwordRef.current.props.value;
    const phone = numberRef.current.props.value;
    const role = typeRef.current.props.value;

    if (role === "admin") {
      if (validateAdmin(phone, password)) {
        dispatch(loginUser({ user: 0, type: "admin" }));
        navigate("/0");
      } else {
        console.log("admin not found");
      }
    } else if (role === "employee") {
      const user = validateEmployee(phone, password);
      if (user) {
        dispatch(loginUser(user));
        navigate(`/${user.user}`);
      } else {
        console.log("Employee not found");
      }
    }
  };

  return (
    <div className="Login">
      <header className="Login-header">Login</header>
      <div className="Login-form">
        <Form name="basic" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input ref={numberRef} type="number" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password ref={passwordRef} />
          </Form.Item>

          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Select
              placeholder="Select your role"
              defaultValue=""
              ref={typeRef}
            >
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="employee">Employee</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
