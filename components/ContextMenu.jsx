import React from "react";

export default function ContextMenu({ position, setExpenseData, ExpenseForm }) {
  const [setExpenseForm, filterData, setEditingRowId] = ExpenseForm;

  const [setExpense, rowId] = setExpenseData;
  const [contextMenuStyle, setContextMenuStyle] = position;
  if (!contextMenuStyle.left) return;
  return (
    <div className="context-menu" style={contextMenuStyle}>
      <div
        onClick={() => {
          setEditingRowId(rowId);
          setContextMenuStyle({});
          const { title, category, amount } = filterData.find(
            (expense) => expense.id === rowId
          );

          setExpenseForm({
            title,
            category,
            amount,
          });
        }}
      >
        Edit
      </div>
      <div
        onClick={() => {
          setContextMenuStyle({});
          setExpense((pre) => pre.filter((expense) => expense.id != rowId));
        }}
      >
        Delete
      </div>
    </div>
  );
}
