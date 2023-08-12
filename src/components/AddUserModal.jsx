import React, { useState } from "react";
import "./styles/modal.css";
import Button from "./Button";

const validatePhoneNumber = (input_str) =>
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.re.test(
    input_str
  );

export default function AddUserModal({ toggleModal, prev = {}, addOrUpdate }) {
  const [data, setData] = useState(prev);

  const handleInputChange = (event) => {
    if (event.target.name !== "hobbies")
      setData((prev) => {
        return { ...prev, [event.target.name]: event.target.value || "" };
      });
    else
      setData((prev) => {
        return {
          ...prev,
          [event.target.name]: event.target.value.split(",") || "",
        };
      });
  };

  return (
    <div className="modal" id="myModal">
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={toggleModal}>
            &times;
          </span>
          <h2>Modal Header</h2>
        </div>
        <div className="modal-body">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              placeholder="Name"
              name="name"
              value={data.name || ""}
              onChange={(e) => handleInputChange(e)}
            />
            <input
              type="text"
              placeholder="Mobile Number"
              name="number"
              min={0}
              value={data.number || ""}
              onChange={(e) => handleInputChange(e)}
            />
            <input
              placeholder="Email"
              name="email"
              value={data.email || ""}
              onChange={(e) => handleInputChange(e)}
            />
            <input
              placeholder="Hobbies (Separated by ',')"
              name="hobbies"
              value={(data.hobbies && data.hobbies.join(",")) || ""}
              onChange={(e) => handleInputChange(e)}
            />
            <Button
              text="Submit"
              callBack={async (e) => {
                if (!data.name.match(/^[a-zA-Z ]*$/)) {
                  alert("Invalid Name");
                  return;
                }
                if (
                  !data?.email?.match(
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                  )
                ) {
                  alert("Invalid Email");
                  return;
                }
                if (
                  !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
                    data.number
                  )
                ) {
                  alert("Invalid Number");
                  return;
                }
                if (
                  !(
                    data?.hobbies &&
                    Array.isArray(data?.hobbies) &&
                    data.hobbies.length > 0
                  )
                ) {
                  alert("Invalid Input For Hobbies");
                  return;
                }
                await addOrUpdate(data);
                toggleModal();
              }}
            />
          </form>
        </div>
        <div className="modal-footer">
          <h3>Modal Footer</h3>
        </div>
      </div>
    </div>
  );
}
