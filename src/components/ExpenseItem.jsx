import axios from "axios";
import moment from "moment";
import numeral from "numeral";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../shared/context/auth-context";
import { ExpensesContext } from "../shared/context/expenses-context";
import Button from "./Button";
import "./ExpenseItem.css";

const url = "http://localhost:5000/api/expenses/";

const ExpenseItem = ({ description, amount, createdAt, id }) => {
  const { token } = useContext(AuthContext);
  const { dispatch } = useContext(ExpensesContext);
  const deleteExpenseHandler = async () => {
    let response;

    try {
      response = await axios.delete(url + id, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: "REMOVE_EXPENSE", id });
    } catch (error) {}
  };
  return (
    <div className="list-item">
      <Link to={`/editexpense/${id}`} className="list-item__link">
        <h3 className="list-item__title">{description}</h3>
        <span className="list-item__sub-title">
          {moment(createdAt).format("Do MMMM, YYYY")}
        </span>
      </Link>
      <div>
        <h3 className="list-item__data">
          {numeral(amount / 100).format("$0,0.00")}
        </h3>
        <Button danger small onClick={deleteExpenseHandler}>
          delete
        </Button>
      </div>
    </div>
  );
};

export default ExpenseItem;
