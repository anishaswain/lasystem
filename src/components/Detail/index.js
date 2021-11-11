import Admin from "../Admin";
import PropTypes from "prop-types";
import Employee from "../Employee";

function Detail(props) {
  return (
    <div className="App">
      {props.user.type === "admin" ? <Admin></Admin> : <Employee />}
    </div>
  );
}

Detail.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Detail;
