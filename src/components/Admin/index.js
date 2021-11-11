import { useRef } from "react";
import { addEmployeeByAdmin } from "../../actions/adminActions";
import { addEmployeeDetails, changeLeaves } from "../../actions/employeeAction";
import { useDispatch, useSelector } from "react-redux";
import { employeeData } from "../../mock/employees";
import Logout from "../Logout";

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
      name: nameRef.current.value,
      phone: phoneRef.current.value,
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
      <header className="App-header">Details</header>
      <header className="App-header">
        Admin
        <div className="admin-detail">
          {adminData ? (
            <div>
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
            </div>
          ) : (
            <div>loading...</div>
          )}
        </div>
        <Logout />
      </header>
      <div className="add-employee">
        <form>
          <input type="text" placeholder="add name" ref={nameRef}></input>
          <input
            type="number"
            placeholder="add phone number"
            ref={phoneRef}
          ></input>
          <button onClick={(e) => addEmployee(e)}>Add</button>
        </form>
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
                      item.leaves.map((leave, key) => (
                        <div key={key}>
                          <span className="admin-detail">{leave.date}</span>
                          <button
                            className={
                              leave.status !== "approved"
                                ? "approve"
                                : "approved"
                            }
                            onClick={() => handleApprove(item["e_id"], leave)}
                          >
                            {leave.status !== "approved"
                              ? "approve"
                              : "approved"}
                          </button>
                        </div>
                      ))
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
