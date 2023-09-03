import React from "react";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDeleteStandardMutation } from "../../../api/standard";
import { actions } from "../../../app/store";

const DeleteModal = ({ data }) => {
  const { id, confirmationMessage = "" } = data || {};
  // console.log("ID>>>>>>", id);

  const { open } = useSelector((state) => state?.modal?.delete || "");
  const [deleteStandard, { isLoading }] = useDeleteStandardMutation();

  const handleDelete = async () => {
    try {
      await deleteStandard(id);
      handleClose();
    } catch (error) {
      toast.error(error?.message || "An error occurred while deleting.");
    }
  };

  const handleClose = () => actions.modal.closeDelete();

  return (
    <Modal show={open} onHide={handleClose} animation={true} centered>
      <Modal.Body className="rounded rounded-5 bg-white edit_modal_width">
        <div className="w-100 d-flex justify-content-center m-auto  py-2 text-center">
          <h3 className="delete_message">{`${
            confirmationMessage ||
            `Are you sure you want to delete this standard?`
          }`}</h3>
        </div>
        <div className="d-flex">
          <button
            type="button"
            onClick={handleDelete}
            disabled={isLoading}
            className="modal_save_button w-50 me-3"
          >
            Yes
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="w-50 modal_close_button"
          >
            No
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
