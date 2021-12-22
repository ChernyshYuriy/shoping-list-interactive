import React from "react";
import Styles from "../../css/checkbox.module.css";

function Checkbox(props) {
  return (
    <div className={Styles.checkbox}>
      {props.status ? (
        <svg
          className={Styles["checkbox-icon"]}
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
        >
          <path d="M9 22l-10-10.598 2.798-2.859 7.149 7.473 13.144-14.016 2.909 2.806z" />
        </svg>
      ) : null}
    </div>
  );
}

export default Checkbox;
