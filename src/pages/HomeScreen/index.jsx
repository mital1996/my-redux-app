import React, { useState, useEffect } from "react";
import { useGetStandardQuery } from "../../api/standard";
import { Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { actions } from "../../app/store";
import { IoIosAddCircle } from "react-icons/io";

const HomeScreen = () => {
  const [standards, setStandards] = useState([]);
  const { data } = useGetStandardQuery();

  const handleOpen = (e, data = { open: true, data: null }) => {
    actions.modal.openStandard(data);
  };

  const handleOpenDelete = (e, id) => {
    actions.modal.openDelete({ id });
  };

  useEffect(() => {
    if (!data || data?.status !== 200) return;
    setStandards(data?.data);
  }, [data]);

  return (
    <div>
      <h1>Standard</h1>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Fees</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {standards.map((standard) => (
            <tr key={standard._id}>
              <td>{standard.name}</td>
              <td>{standard.fees}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={(e) => handleOpen(e, standard)}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={(e) => handleOpenDelete(e, standard._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="position-fixed bottom-0 end-0 p-3 ">
        <IoIosAddCircle
          onClick={handleOpen}
          size={62}
          style={{ color: "#3660F8", cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default HomeScreen;
