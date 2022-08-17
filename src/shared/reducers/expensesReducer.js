export default function expensesReducer(state, action) {
  switch (action.type) {
    case "POPULATE_EXPENSES":
      return action.expenses;
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter((expense) => expense.id !== action.id);
    default:
      return state;
  }
}
