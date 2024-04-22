import { useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import expenseData from "./ExpenseData";
import { useLocalStorage } from "../hooks/useLocalStorage";

function App() {
  const [expense, setExpense] = useLocalStorage("expenses", expenseData);

  const [expenseForm, setExpenseForm] = useLocalStorage("expenseForm", {
    title: "",
    category: "",
    amount: "",
  });

  const [editingRowId, setEditingRowId] = useLocalStorage("editingRowId", "");
  return (
    <>
      <main>
        <h1>Track Your Expense</h1>
        <div className="expense-tracker">
          <ExpenseForm
            setExpense={setExpense}
            form={[expenseForm, setExpenseForm, editingRowId, setEditingRowId]}
          />
          <ExpenseTable
            expensesData={[expense, setExpense]}
            ExpenseForm={[setExpenseForm, expenseForm, setEditingRowId]}
          />
        </div>
      </main>
    </>
  );
}

export default App;
