import ExpenseItem from "./ExpenseItem";
import Button from "./Button";
import "./ExpenseList.css";

const ExpenseList = ({ expenses = [] }) => {
  return (
    <div className="expense-list">
      <div className="expense-list__header">
        <div>Expense</div>
        <div>Amount</div>
      </div>
      {expenses.length > 0 ? (
        expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            description={expense.description}
            id={expense.id}
            amount={expense.amount}
            createdAt={expense.createdAt}
          />
        ))
      ) : (
        <div className="expense-list__no-items">No items to show</div>
      )}
      <div>
        <Button to="/addexpense" big anime>
          Add Expense
        </Button>
      </div>
    </div>
  );
};

export default ExpenseList;
