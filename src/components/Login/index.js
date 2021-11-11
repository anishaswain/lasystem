import "./index.css";
import { useRef } from "react";
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
        return "employee passsword doesn't match";
      }
    } else {
      return "Employee not found";
    }
  };

  const handleSubmit = () => {
    if (typeRef.current.value === "admin") {
      if (validateAdmin(numberRef.current.value, passwordRef.current.value)) {
        dispatch(loginUser({ user: 0, type: "admin" }));
        navigate("/0");
      } else {
        console.log("admin not found");
      }
    } else if (typeRef.current.value === "employee") {
      const user = validateEmployee(
        numberRef.current.value,
        passwordRef.current.value
      );
      if (typeof user === "object") {
        dispatch(loginUser(user));
        navigate(`/${user.user}`);
      } else {
        console.log(user);
      }
    }
  };

  return (
    <div className="Login">
      <header className="Login-header">
        Login
        <form>
          <input
            type="number"
            placeholder="input number here"
            maxLength="10"
            ref={numberRef}
          ></input>
          <input
            type="password"
            placeholder="input password here"
            ref={passwordRef}
          ></input>
          <select name="role" ref={typeRef}>
            <option defaultValue="" selected disabled hidden>
              Choose here
            </option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
        </form>
        <button type="submit" onClick={() => handleSubmit()}>
          Submit
        </button>
      </header>
    </div>
  );
}

export default Login;
