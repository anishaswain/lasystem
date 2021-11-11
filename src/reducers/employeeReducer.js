const initState = [];

const employeeReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOAD_EMPLOYEE_DATA":
      return action.payload;
    case "FETCH_EMPLOYEE": {
      const targetEmployees = state.filter((item) =>
        action.payload.includes(item.e_id)
      );
      return targetEmployees;
    }
    case "ADD_EMPLOYEE_DETAIL": {
      const targetEmployee = state.filter(
        (item) => item.e_id !== action.payload.id
      );
      return [...targetEmployee, action.payload];
    }
    case "ADD_LEAVES": {
      const targetEmployeeToAdd = state.filter(
        (item) => item.e_id === action.payload.id
      );
      targetEmployeeToAdd[0].leaves = action.payload.leaves;
      return [...state, targetEmployeeToAdd];
    }
    case "CHANGE_LEAVES": {
      const targetEmployeeToChange = state.filter(
        (item) => item.e_id === action.payload.id
      );
      targetEmployeeToChange[0].leaves = action.payload.leaves;
      return [...state, targetEmployeeToChange];
    }
    default:
      return state;
  }
};

export default employeeReducer;
