import { useCallback } from "react";
import Button from "./Button";
import axios from "axios";

export default function Table({
  data,
  handleUpdate,
  handleUsersToSend,
  deleteSingle,
}) {
  const head = [
    "Select",
    "Index",
    "Name",
    "Email",
    "Number",
    "Country",
    "Action",
  ];

  return (
    <>
      <table>
        <tbody>
          <tr>
            {head.map((head, index) => {
              return <th key={index}>{head}</th>;
            })}
          </tr>
          {data.map(function (row, index) {
            return (
              <tr key={row._id}>
                <td>
                  <input
                    type="checkbox"
                    onClick={(event) => handleUsersToSend(event, row)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.number}</td>
                <td>{row.hobbies.join(",")}</td>
                <td>
                  <Button callBack={() => handleUpdate(row)} text="update" />
                  <Button
                    callBack={() => {
                      deleteSingle(row._id);
                    }}
                    text="delete"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
