"use client";
import Modal from "@/components/Modal/Modal";
import React from "react";
import { useRouter } from "next/navigation";
import SignIn from "@/components/Auth/SignIn";

const SignInModal = () => {
  const router = useRouter();
  function closeModal() {
    router.back();
  }
  return (
    <Modal handleHide={closeModal}>
      <SignIn />
    </Modal>
  );
};

export default SignInModal;
