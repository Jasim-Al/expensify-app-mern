import axios from "axios";
import { useContext, useEffect } from "react";
import ExpenseList from "../components/ExpenseList";
import Loader from "../components/Loader";
import { AuthContext } from "../shared/context/auth-context";
import { ExpensesContext } from "../shared/context/expenses-context";

import "./Dashboard.css";

const url = "http://localhost:5000/api/expenses";

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const { dispatch, expenses, setExpensesLength } = useContext(ExpensesContext);
  useEffect(() => {
    const fetchData = async () => {
      let response;
      try {
        response = await axios.get(url + "/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        await dispatch({
          type: "POPULATE_EXPENSES",
          expenses: response.data.expenses,
        });
        await setExpensesLength(response.data.expenses.length);
      } catch (error) {}
    };
    fetchData();
  }, [token, dispatch, setExpensesLength]);

  return (
    <div className="dashboard">
      {expenses ? <ExpenseList expenses={expenses} /> : <Loader />}
    </div>
  );
};

export default Dashboard;
