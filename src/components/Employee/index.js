import Logout from "../Logout";
import "./index.css";
import { useState, useEffect, useRef } from "react";
import {
  addEmployeeDetails,
  changeLeaves,
  addLeaves,
} from "../../actions/employeeAction";
import { useSelector, useDispatch } from "react-redux";
import { FaPencilAlt, FaCheck } from "react-icons/fa";

function Employee() {
  const dispatch = useDispatch();
  const [user, setUserData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const userData = useSelector((state) => state.current);
  const employeesData = useSelector((state) => state.employees);

  const dateRef = useRef();
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
    const leavesLeft = user.leaves.filter((item) => item.date !== leave.date);
    dispatch(changeLeaves({ id: userData.user, leaves: leavesLeft }));
  };

  const addLeave = () => {
    const leave = dateRef.current.value;
    const totalLeaves = [
      ...user.leaves,
      { date: leave, status: "not-approved" },
    ];
    dispatch(addLeaves({ id: userData.user, leaves: totalLeaves }));
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
            <div style={{ marginTop: "5vmin" }}>
              <h1 className="admin-detail">
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
              </h1>
              <h1 className="admin-detail">
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
              </h1>
              <h1 className="admin-detail">
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
              </h1>
              <h1 className="admin-detail">
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
              </h1>
              <h1 className="admin-detail">
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
              </h1>
            </div>
          </div>
          <div style={{ minWidth: "50%", float: "right" }}>
            <Logout />
          </div>
        </div>
      </header>
      <div className="employee-detail">
        <div>
          <div style={{ float: "right" }}>
            Leaves:{" "}
            <input type="date" id="laves" name="leaves" ref={dateRef}></input>
            <button onClick={() => addLeave()}>Add Leaves</button>
          </div>
          {user.leaves ? (
            user.leaves.map((leave, key) => (
              <div key={key}>
                <span className="admin-detail">{leave.date}</span>
                <span
                  className={
                    leave.status !== "approved" ? "approve" : "approved"
                  }
                >
                  <i>{leave.status}</i>
                </span>
                <button onClick={() => deleteLeave(leave)}>Delete</button>
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Employee;
