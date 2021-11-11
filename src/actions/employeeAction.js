export const loadEmployeeData = (payload) => {
  //payload is new object
  return {
    type: "LOAD_EMPLOYEE_DATA",
    payload: payload,
  };
};

export const fetchEmployees = (payload) => {
  //payload in employee ids
  return {
    type: "FETCH_EMPLOYEE",
    payload: payload,
  };
};

export const addEmployeeDetails = (payload) => {
  //payload is new employee object
  return {
    type: "ADD_EMPLOYEE_DETAIL",
    payload: payload,
  };
};

export const addLeaves = (payload) => {
  //payload is id and leaves object
  return {
    type: "ADD_LEAVES",
    payload: payload,
  };
};

export const changeLeaves = (payload) => {
  //payload is id and leaves object
  return {
    type: "CHANGE_LEAVES",
    payload: payload,
  };
};
