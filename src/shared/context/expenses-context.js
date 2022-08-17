import { createContext } from "react";

export const ExpensesContext = createContext({
  dispatch: () => {},
  expenses: [],
  expensesLength: null,
  setExpensesLength: () => {},
});
