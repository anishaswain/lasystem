export const loadAdminData = (payload) => {
  //payload is new object
  return {
    type: "ADD_ADMIN_DATA",
    payload: payload,
  };
};

export const addEmployeeByAdmin = (payload) => {
  //payload is id
  return {
    type: "ADD_EMPLOYEE",
    payload: payload,
  };
};

export const removeEmployeeByAdmin = (payload) => {
  //payload is id
  return {
    type: "REMOVE_EMPLOYEE",
    payload: payload,
  };
};
