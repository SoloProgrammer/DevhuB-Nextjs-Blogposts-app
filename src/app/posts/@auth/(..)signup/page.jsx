"use client";
import Modal from "@/components/Modal/Modal";
import React from "react";
import { useRouter } from "next/navigation";
import SignUp from "@/components/Auth/SignUp";

const SignUpModal = () => {
  const router = useRouter();
  function closeModal() {
    router.back();
  }
  return (
    <Modal handleHide={closeModal}>
      <SignUp />
    </Modal>
  );
};

export default SignUpModal;
