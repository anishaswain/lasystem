import { logoutUser } from "../../actions/userActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Logout() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="Login">
      <button onClick={() => handleSubmit()}>Logout</button>
    </div>
  );
}

export default Logout;
