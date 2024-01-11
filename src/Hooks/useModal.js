import { useState } from "react";

function useModal() {
  const [show, setShow] = useState(false);

  const handleCloseModal = () => setShow(false);

  const openModal = () => setShow(true);

  const toggleModal = () => setShow(!show);

  return [show, setShow, openModal, handleCloseModal, toggleModal];
}
export default useModal;
