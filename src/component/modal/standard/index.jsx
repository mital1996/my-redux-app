import { Form, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { actions } from "../../../app/store";

import {
  useCreateStandardMutation,
  useUpdateStandardMutation,
} from "../../../api/standard";
import { useEffect } from "react";

const StandardModal = () => {
  const { open, data } = useSelector((state) => state?.modal?.standard);
  const [updateReq, { isLoading: isUpdating }] = useUpdateStandardMutation();
  const [addReq, { isLoading: isCreating }] = useCreateStandardMutation();

  const form = useForm({
    defaultValues: {
      name: data?.name || "",
      fees: data?.fees || "",
    },
  });

  useEffect(() => {
    form.setValue("name", data?.name || "");
    form.setValue("fees", data?.fees || "");
  }, [data, form]);

  const handleClose = () => actions.modal.closeStandard();

  // Create and Update API
  const submitHandler = async (formData) => {
    try {
      const payload = {
        ...formData,
        _id: data?._id,
      };
      const response = data?._id
        ? await updateReq(payload)
        : await addReq(payload);
      const message = `Standard ${
        data?._id ? "updated" : "created"
      } successfully`;

      if (
        [200, 201, 202, "success", "Success"].includes(response?.data?.status)
      ) {
        toast.success(message);
        form.reset();
      }
      handleClose();
    } catch (error) {
      toast.error(error?.message || "An error occurred.");
    }
  };

  return (
    <Modal show={open} onHide={handleClose} animation={true} centered>
      <Modal.Body className="rounded-3 bg-white edit_modal_width">
        <Form onSubmit={form.handleSubmit(submitHandler)} role="form">
          <Form.Group className="my-2" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              {...form.register("name")}
              autoComplete="off"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="fees">
            <Form.Label>Fees</Form.Label>
            <Form.Control
              type="number"
              name="fees"
              {...form.register("fees")}
              autoComplete="off"
            ></Form.Control>
          </Form.Group>

          <div className="d-flex mt-3 ">
            <button
              type="submit"
              disabled={isUpdating || isCreating}
              className="modal_save_button w-50 me-3"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="w-50 modal_close_button"
            >
              Close
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default StandardModal;
