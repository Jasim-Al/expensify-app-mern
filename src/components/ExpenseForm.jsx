import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";

import Input from "./Input";
import Button from "./Button";
import { AuthContext } from "../shared/context/auth-context";
import "./ExpenseForm.css";
import "react-dates/lib/css/_datepicker.css";

const url = "http://localhost:5000/api/expenses/";

const ExpenseForm = (props) => {
  const [calenderFocused, setCalenderFocused] = useState(false);
  const { eid } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    description: "",
    note: "",
    amount: "",
    createdAt: moment(),
  });

  const formChangeHandler = (event) => {
    setForm((form) => {
      return { ...form, [event.target.name]: event.target.value };
    });
  };

  useEffect(() => {
    if (eid) {
      const fetchExpense = async () => {
        let response;
        try {
          response = await axios.get(url + eid, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setForm({
            description: response.data.expense.description,
            note: response.data.expense.note,
            amount: (response.data.expense.amount / 100).toString(),
            createdAt: moment(response.data.expense.createdAt),
          });
        } catch (error) {}
      };
      fetchExpense();
    }
  }, [eid, token]);

  const submitHandler = async (event) => {
    event.preventDefault();

    let response;

    if (eid) {
      try {
        response = await axios.patch(
          `${url}/${eid}`,
          {
            ...form,
            createdAt: form.createdAt.valueOf(),
            amount: parseFloat(form.amount, 10) * 100,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        navigate("/dashboard");
      } catch (error) {}
    } else {
      try {
        response = await axios.post(
          `${url}/`,
          {
            ...form,
            createdAt: form.createdAt.valueOf(),
            amount: parseFloat(form.amount, 10) * 100,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        navigate("/dashboard");
      } catch (error) {}
    }
  };

  const onDateChange = (createdAt) => {
    if (createdAt) {
      setForm((form) => {
        return { ...form, createdAt: createdAt };
      });
    }
  };

  const onFocusChange = ({ focused }) => {
    setCalenderFocused(focused);
  };

  return (
    <form className="expense-form">
      <Input
        value={form.description}
        name="description"
        placeholder="Description"
        onChange={formChangeHandler}
      />
      <Input
        value={form.note}
        name="note"
        placeholder="Add a note to your expense (optional)"
        onChange={formChangeHandler}
      />
      <Input
        value={form.amount}
        name="amount"
        placeholder="Amount"
        type="number"
        onChange={formChangeHandler}
      />

      <div className="expense-form__actions">
        <SingleDatePicker
          date={form.createdAt}
          onDateChange={onDateChange}
          focused={calenderFocused}
          displayFormat={() => "DD/MM/YYYY"}
          onFocusChange={onFocusChange}
          id={"14"}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        <Button big anime onClick={submitHandler}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default ExpenseForm;
