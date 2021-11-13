import { Button } from "antd";
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
    <div className="Login" style={{ float: "right" }}>
      <Button type="primary" onClick={() => handleSubmit()}>
        Logout
      </Button>
    </div>
  );
}

export default Logout;
