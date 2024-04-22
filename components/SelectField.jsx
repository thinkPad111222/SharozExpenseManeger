import React from "react";

export default function SelectField({
  label,
  id,
  value,
  HandleChange,
  defaultOption,
  OptionArray,
  error,
}) {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={HandleChange}>
        <option hidden>{defaultOption}</option>
        {OptionArray.map((opt, i) => {
          return (
            <option key={i} value={opt}>
              {opt}
            </option>
          );
        })}
      </select>
      <p className="error">{error}</p>
    </div>
  );
}
