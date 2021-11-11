import Logout from "../Logout";
import { useState, useEffect, useRef } from "react";
import { changeLeaves, addLeaves } from "../../actions/employeeAction";
import { useSelector, useDispatch } from "react-redux";

function Employee() {
  const dispatch = useDispatch();
  const [user, setUserData] = useState([]);
  const dateRef = useRef();
  const userData = useSelector((state) => state.current);
  const employeesData = useSelector((state) => state.employees);
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

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: "flex" }}>
          <div style={{ minWidth: "50%", margin: "0 1vmin 3vmin" }}>
            Employee
            <div>
              <div className="admin-detail">Name: {user.name}</div>
              <div className="admin-detail">Phone: {user.phone}</div>
              <div className="admin-detail">Age:{user.age}</div>
              <div className="admin-detail">Gender: {user.gender}</div>
              <div className="admin-detail">Address:{user.address}</div>
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
