import Logout from "../Logout";
import "./index.css";
import { useState, useEffect, useRef } from "react";
import {
  addEmployeeDetails,
  changeLeaves,
  addLeaves,
} from "../../actions/employeeAction";
import { Card, Table, Space, DatePicker, Button, Tag } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { FaPencilAlt, FaCheck } from "react-icons/fa";

function Employee() {
  const dispatch = useDispatch();
  const [date, setDate] = useState();
  const [user, setUserData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const userData = useSelector((state) => state.current);
  const employeesData = useSelector((state) => state.employees);

  const ageRef = useRef();
  const genderRef = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();
  const nameRef = useRef();

  useEffect(() => {
    const currentUser = employeesData.filter(
      (item) => item.e_id === userData.user
    );
    setUserData(currentUser[0]);
  }, [userData]);

  const deleteLeave = (leave) => {
    console.log(leave);
    const leavesLeft = user.leaves.filter((item) => item.date !== leave);
    dispatch(changeLeaves({ id: userData.user, leaves: leavesLeft }));
  };

  const addLeave = () => {
    const leave = date;
    const totalLeaves = [
      ...user.leaves,
      { key: user.leaves.length + 1, date: leave, status: "not-approved" },
    ];
    dispatch(addLeaves({ id: userData.user, leaves: totalLeaves }));
  };

  const onChangeDate = (date, dateString) => {
    setDate(dateString);
  };

  const changeUserData = () => {
    const name = nameRef.current.value;
    const age = ageRef.current.value;
    const gender = genderRef.current.value;
    const address = addressRef.current.value;
    const phone = phoneRef.current.value;
    const newUser = {
      ...user,
      name: name,
      phone: phone,
      age: age,
      gender: gender,
      address: address,
    };
    dispatch(addEmployeeDetails(newUser));
    setEditMode(false);
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        const color = text === "approved" ? "green" : "red";
        return (
          <Tag color={color} key={text}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle" onClick={() => deleteLeave(record.date)}>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: "flex" }}>
          <div style={{ minWidth: "50%", margin: "0 1vmin 3vmin" }}>
            Employee
            <FaPencilAlt
              size={20}
              style={{ marginLeft: "2vmin" }}
              onClick={() => setEditMode((prev) => !prev)}
            />
            {editMode ? (
              <FaCheck
                style={{ marginLeft: "3vmin" }}
                onClick={() => changeUserData()}
              />
            ) : (
              <></>
            )}
          </div>
          <div style={{ minWidth: "50%", float: "right" }}>
            <Logout />
          </div>
        </div>
      </header>
      <div className="employee-detail">
        <Card title={user.name} bordered={false} style={{ width: 300 }}>
          <div>
            <p>
              Name :{" "}
              {editMode ? (
                <input
                  className="edit-input"
                  defaultValue={user.name}
                  ref={nameRef}
                ></input>
              ) : (
                user.name
              )}
            </p>
            <p>
              Phone :{" "}
              {editMode ? (
                <input
                  className="edit-input"
                  defaultValue={user.phone}
                  ref={phoneRef}
                ></input>
              ) : (
                user.phone
              )}
            </p>
            <p>
              Age :{" "}
              {editMode ? (
                <input
                  className="edit-input"
                  defaultValue={user.age}
                  ref={ageRef}
                ></input>
              ) : (
                user.age
              )}
            </p>
            <p>
              Gender :{" "}
              {editMode ? (
                <input
                  className="edit-input"
                  defaultValue={user.gender}
                  ref={genderRef}
                ></input>
              ) : (
                user.gender
              )}
            </p>
            <p>
              Address :{" "}
              {editMode ? (
                <input
                  className="edit-input"
                  defaultValue={user.address}
                  ref={addressRef}
                ></input>
              ) : (
                user.address
              )}
            </p>
          </div>
        </Card>
        <Card>
          <div>
            {user.leaves ? (
              <>
                <Space direction="vertical">
                  <DatePicker onChange={onChangeDate} />
                </Space>
                <Button onClick={() => addLeave()} type="primary">
                  Add Leaves
                </Button>
                <Table columns={columns} dataSource={user.leaves} />
              </>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Employee;
