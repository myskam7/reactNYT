import React from "react";
// import "./SavedBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const DeleteBtn = props => (
  <span className="delete-btn" {...props}>
    x
  </span>
);

export default DeleteBtn;