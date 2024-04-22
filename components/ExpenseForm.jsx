import React, { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";

export default function ExpenseForm({ setExpense, form }) {
  const [expenseForm, setExpenseForm, editingRowId, setEditingRowId] = form;

  const [error, setError] = useState({});
  const validationConfig = {
    title: [
      { required: true, message: "Please enter Title" },
      { minLength: 5, message: "Title should be at least 5 characters long" },
    ],
    category: [{ required: true, message: "Please enter Category" }],
    amount: [
      {
        required: true,
        message: "Please enter Amount",
      },
      {
        pattern: /^-?(0|[1-9]\d*)$/,
        message: "please enter valilade number",
      },
    ],
  };
  const validate = (formData) => {
    const errorData = {};
    Object.entries(formData).forEach(([key, value]) => {
      validationConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorData[key] = rule.message;
          return true;
        }
        if (rule.minLength && value.length < 5) {
          errorData[key] = rule.message;
          return true;
        }
        if (rule.pattern && !rule.pattern.test(value)) {
          errorData[key] = rule.message;
          return true;
        }
      });
    });

    setError(errorData);
    return errorData;
  };

  function HandleSubmit(e) {
    e.preventDefault();
    const validateResult = validate(expenseForm);
    if (Object.keys(validateResult).length) return;

    if (editingRowId) {
      setExpense((pre) =>
        pre.map((preEx) => {
          if (preEx.id === editingRowId) {
            return { ...expenseForm, id: editingRowId };
          }
          return preEx;
        })
      );
      setEditingRowId("");
    } else {
      setExpense((prev) => [
        ...prev,
        { ...expenseForm, id: crypto.randomUUID() },
      ]);
    }

    setExpenseForm({
      title: "",
      category: "",
      amount: "",
    });
  }

  const HandleChange = (e) => {
    const { id, value } = e.target;
    setExpenseForm((prev) => ({ ...prev, [id]: value }));
    setError({});
  };

  return (
    <form className="expense-form" onSubmit={HandleSubmit}>
      <InputField
        id="title"
        HandleChange={HandleChange}
        label={"Title"}
        value={expenseForm.title}
        error={error.title}
      />

      <SelectField
        label={"Category"}
        id={"category"}
        value={expenseForm.category}
        HandleChange={HandleChange}
        defaultOption="Select Category"
        error={error.category}
        OptionArray={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
      />

      <InputField
        id="amount"
        HandleChange={HandleChange}
        label={"Amount"}
        value={expenseForm.amount}
        error={error.amount}
      />

      <button className="add-btn">{editingRowId ? "Save" : "Add"}</button>
    </form>
  );
}
