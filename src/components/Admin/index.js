import { useRef } from "react";
import { Card, Button, Form, Input } from "antd";
import { addEmployeeByAdmin } from "../../actions/adminActions";
import { addEmployeeDetails, changeLeaves } from "../../actions/employeeAction";
import { useDispatch, useSelector } from "react-redux";
import { employeeData } from "../../mock/employees";
import Logout from "../Logout";
import AntDTable from "../AntDTable";

function Admin() {
  const dispatch = useDispatch();
  const adminData = useSelector((state) => state.admin);
  const employeesData = useSelector((state) => state.employees);
  const nameRef = useRef();
  const phoneRef = useRef();

  const addEmployee = (e) => {
    e.preventDefault();
    const newEmployee = {
      e_id: employeeData.length + 1,
      name: nameRef.current.props.value,
      phone: phoneRef.current.props.value,
      password: "password",
      age: 0,
      gender: "",
      address: "",
      yoe: 0,
      leaves: [],
      admin: adminData["a_id"],
    };
    dispatch(addEmployeeByAdmin(employeeData.length + 1));
    dispatch(addEmployeeDetails(newEmployee));
  };

  const handleApprove = (id, leave) => {
    console.log(id, leave);
    const selectedEmployee = employeesData.filter((item) => item.e_id === id);
    const leaves = selectedEmployee[0].leaves;
    leaves.map((item) => {
      if (item.date === leave.date) {
        item.status = item.status === "approved" ? "not-approved" : "approved";
      }
    });
    dispatch(changeLeaves({ id: id, leaves: leaves }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: "inline-block" }}>
          <div style={{ maxWidth: "50%" }}>Admin</div>
          <Logout />
        </div>
      </header>
      <div>
        {adminData ? (
          <Card title={adminData.name} bordered={true}>
            <p>
              <b>Name: </b>
              {adminData.name}
            </p>
            <p>
              <b>Phone: </b>
              {adminData.phone}
            </p>
            <p>
              <b>years of experience: </b>
              {adminData.yoe}
            </p>
          </Card>
        ) : (
          <div>loading...</div>
        )}
        <Card>
          <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 10 }}>
            <Form.Item
              label="Add Employee Name"
              name="name"
              rules={[
                { required: true, message: "Please input employee name!" },
              ]}
            >
              <Input ref={nameRef} />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input employee phone number!",
                },
              ]}
            >
              <Input.Password ref={phoneRef} type="number" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={(e) => addEmployee(e)}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>

      <div className="employee-detail">
        {employeeData ? (
          <div>
            {employeesData
              .filter((item) => adminData.employee.includes(item["e_id"]))
              .map((item, key) => (
                <div key={key}>
                  <div key={key}>{item.name}</div>
                  <div>
                    {item.leaves.length === 0 ? (
                      <span className="admin-detail">
                        No leaves applied yet
                      </span>
                    ) : (
                      <AntDTable
                        action={handleApprove}
                        data={item.leaves}
                        id={item["e_id"]}
                      />
                    )}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div>loading...</div>
        )}
      </div>
    </div>
  );
}

export default Admin;
