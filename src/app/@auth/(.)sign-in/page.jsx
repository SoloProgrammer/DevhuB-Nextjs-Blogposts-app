"use client";
import Modal from "@/components/Modal/Modal";
import React from "react";
import { useRouter } from "next/navigation";
import { SignIn } from "@/app/(auth)/sign-in/page";
const page = () => {
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

export default page;
