import { useState } from "react";

function useModal() {
    const [show, setShow] = useState(false);

    const handleCloseModal = () => setShow(false);

    return [show, setShow, handleCloseModal]
}
export default useModal