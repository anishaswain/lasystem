const initState = {
  a_id: 1,
  name: "",
  phone: "",
  password: "",
  age: 0,
  gender: "",
  address: "",
  yoe: 0,
  leaves: [],
  employee: [],
};

const adminReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_ADMIN_DATA":
      return action.payload;
    case "ADD_EMPLOYEE":
      return { ...state, employee: [...state.employee, action.payload] };
    case "REMOVE_EMPLOYEE":
      return {
        ...state,
        employee: state.employee.filter((item) => item != action.payload),
      };
    default:
      return state;
  }
};

export default adminReducer;
