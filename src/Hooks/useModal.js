import { useState } from "react";

function useModal() {
  const [isOpen, setOpen] = useState(false);

  const closeModal = () => setOpen(false);

  const openModal = () => setOpen(true);

  const toggleModal = () => setOpen(!isOpen);

  return { isOpen, setOpen, openModal, closeModal, toggleModal };
}
export default useModal;
