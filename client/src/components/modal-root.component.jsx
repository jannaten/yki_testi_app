import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { closeModal } from "../redux/slices";
import { useDispatch, useSelector } from "react-redux";

/*===================================================================
	ModalRootComponent
	example: dispatch(modalOpen(modalContent, null, null));
	example: dispatch(modalOpen(<content>, <callback>, <options>));
	- callback: optional e.g. () => console.log('Hello, World')
	- options: object optional (size: sm | md | lg, keyboard: true | false)

	https://react-bootstrap.github.io/components/modal/
===================================================================*/

export default function ModalRootComponent() {
  const dispatch = useDispatch();
  const { options, content, callback } = useSelector(({ modal }) => modal);
  window.onpopstate = () => dispatch(closeModal());

  useEffect(() => {
    dispatch(closeModal());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);

  return (
    <Modal
      style={{ color: "#9967CE" }}
      backdrop={options?.backdrop || "static"}
      size={options?.size || "md"}
      keyboard={options?.keyboard || true}
      fullscreen={options?.fullscreen || false}
      centered={options?.centered || true}
      show={!!content}
      onHide={callback ? () => callback() : () => dispatch(closeModal())}
    >
      {content}
    </Modal>
  );
}
