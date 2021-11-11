export const loginUser = (payload) => {
  //payload is user id
  return {
    type: "LOGIN_USER",
    payload: payload,
  };
};

export const logoutUser = () => {
  return {
    type: "LOGOUT_USER",
  };
};
