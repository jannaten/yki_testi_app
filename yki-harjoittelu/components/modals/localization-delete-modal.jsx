import React from "react";
import { useDispatch } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { closeModal, deleteTranslation } from "../../redux/slices";

function LocalizationDeleteModal({ translation }) {
  const dispatch = useDispatch();
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Are you sure you want to delete?
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button
          variant=""
          onClick={() => {
            dispatch(closeModal());
          }}
          style={{ border: "0.1rem solid #9967CE", color: "#9967CE" }}
        >
          close
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            dispatch(deleteTranslation(translation._id));
            dispatch(closeModal());
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </>
  );
}

export default LocalizationDeleteModal;
