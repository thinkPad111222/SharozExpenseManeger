import React from "react";

export default function InputField({ id, label, value, error, HandleChange }) {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <input id={id} value={value} onChange={HandleChange} />
      <p className="error">{error}</p>
    </div>
  );
}
