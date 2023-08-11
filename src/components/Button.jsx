import React from "react";
import "./styles/button.css";
export default function Button(props) {
  return (
    <button
      onClick={() => {
        if (props.callBack) props.callBack();
      }}
    >
      {props.text == "delete" ? (
        <i className="fa fa-trash"></i>
      ) : props.text == "update" ? (
        <i className="fa fa-edit"></i>
      ) : (
        props.text
      )}
    </button>
  );
}
