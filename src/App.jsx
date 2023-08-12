import "./App.css";
import Table from "./components/Table";
import Button from "./components/Button";
import { useCallback, useEffect, useState } from "react";
import AddUserModal from "./components/AddUserModal";
import axios from "axios";
function App() {
  const [openModal, setOpenModal] = useState(false);
  const [toUpdate, setToUpdate] = useState({});
  const [usersData, setUsersData] = useState([]);
  const [toSend, setToSend] = useState([]);

  const fetchAll = useCallback(async () => {
    const { data } = await axios.get("/api/users");
    setUsersData(data?.usersData || []);
  });
  const deleteSingle = useCallback(async (id) => {
    await axios.delete(`/api/users/${id}`);
    setUsersData((prev) => prev.filter((item) => item._id !== id));
  });
  const addOrUpdate = useCallback(async (data) => {
    console.log(data);
    if (!data._id) {
      await axios.post("/api/users", data);
      data._id = Math.random().toString(36).substring(2, 7);
    } else {
      await axios.put(`/api/users/${data._id}`, data);
    }
    setUsersData((prev) => [...prev, data]);
    fetchAll();
  });
  useEffect(() => {
    try {
      fetchAll();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const toggleModal = useCallback(() => setOpenModal((prev) => !prev), []);
  const handleUpdate = (row) => {
    setToUpdate(row);
    toggleModal();
  };
  const handleToSend = (event, row) =>
    event?.target?.checked === true
      ? setToSend([...toSend, row.id])
      : setToSend((prev) => prev.filter((item) => item !== row.id));

  return (
    <>
      {openModal && (
        <AddUserModal
          addOrUpdate={addOrUpdate}
          toggleModal={toggleModal}
          prev={toUpdate}
        />
      )}
      <Button
        callBack={() => {
          setToUpdate({});
          toggleModal();
        }}
        text="Add"
      />
      <Table
        data={usersData}
        handleUpdate={handleUpdate}
        handleUsersToSend={handleToSend}
        deleteSingle={deleteSingle}
      />
      <Button
        callBack={() => {
          window.open(
            "mailto:info@redpositive.in?subject=Selected%20Users%20Data"
          );
        }}
        text="Send to Email"
      />
    </>
  );
}

export default App;
