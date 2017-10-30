import React from "react";
// import "./SavedBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const SavedBtn = props => (
  <span className="saved-btn" {...props}>
    Save
  </span>
);

export default SavedBtn;