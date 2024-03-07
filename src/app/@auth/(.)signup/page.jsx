"use client";
import Modal from "@/components/Modal/Modal";
import React from "react";
import { useRouter } from "next/navigation";
import { SignUp } from "@/app/(auth)/signup/page";

const signuppage = () => {
  const router = useRouter();
  function closeModal() {
    router.back();
  }
  return (
    <Modal handleHide={closeModal}>
      <SignUp/>
    </Modal>
  );
};

export default signuppage;
