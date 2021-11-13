import "./App.css";
import Login from "./components/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAdminData } from "./actions/adminActions";
import { loadEmployeeData } from "./actions/employeeAction";
import { fetchAdminData } from "./services/fetchAdminData";
import { fetchEmployeeData } from "./services/fetchEmployeeData";

function App() {
  const dispatch = useDispatch();
  const adminData = useSelector((state) => state.admin);
  const employeesData = useSelector((state) => state.employees);
  useEffect(() => {
    console.log(adminData.name);
    if (adminData.name === "") {
      const adminData = fetchAdminData();
      dispatch(loadAdminData(adminData));
    }
    if (employeesData.length === 0) {
      const employeeData = fetchEmployeeData();
      dispatch(loadEmployeeData(employeeData));
    }
  }, []);
  return (
    <div className="App">
      <Login />
    </div>
  );
}
export default App;
