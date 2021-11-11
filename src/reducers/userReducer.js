const initState = {
  user: "",
  type: "",
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...action.payload };
    case "LOGOUT_USER":
      return { user: "" };
    default:
      return state;
  }
};

export default userReducer;
