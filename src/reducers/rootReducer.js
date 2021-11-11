import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import employeeReducer from "./employeeReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  admin: adminReducer,
  employees: employeeReducer,
  current: userReducer,
});

export default rootReducer;
