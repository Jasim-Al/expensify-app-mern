import { useReducer, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Auth from "./pages/Auth";
import Expense from "./pages/Expense";
import Dashboard from "./pages/Dashboard";
import { AuthContext } from "./shared/context/auth-context";
import { ExpensesContext } from "./shared/context/expenses-context";
import { useAuth } from "./shared/hooks/auth-hook";
import expensesReducer from "./shared/reducers/expensesReducer";

import "./App.css";
import Header from "./components/Header";

const App = () => {
  const { token, login, logout, userId } = useAuth();
  const [expenses, dispatch] = useReducer(expensesReducer, []);
  const [expensesLength, setExpensesLength] = useState(0);

  let routes;

  if (token) {
    routes = (
      <>
        <Header logout={logout} />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addexpense" element={<Expense />} />
          <Route path="/editexpense/:eid" element={<Expense />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </>
    );
  } else if (!token) {
    routes = (
      <>
        <Routes>
          <Route path="*" element={<Auth />} />
        </Routes>
      </>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <ExpensesContext.Provider
        value={{
          expenses: expenses,
          dispatch: dispatch,
          expensesLength: expensesLength,
          setExpensesLength: setExpensesLength,
        }}
      >
        <Router>{routes}</Router>
      </ExpensesContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
