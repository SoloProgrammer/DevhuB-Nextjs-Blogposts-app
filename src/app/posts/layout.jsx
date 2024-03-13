"use client";

import SignIn from "@/components/Auth/SignIn";
import Modal from "@/components/Modal/Modal";
import React, { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const RootLayout = ({ children }) => {
  const params = useSearchParams();
  const router = useRouter();

  const handleCloseModal = () => {
    router.back();
  };

  useEffect(() => {
    // Save scroll position when navigating away from the page

    // Restore scroll position on initial page load
    const restoreScrollPosition = () => {
      const scrollPosition = window.sessionStorage.getItem("scrollPosition");
      if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
      }
    };

    // Restore scroll position when navigating back
    restoreScrollPosition();

    const handleScrollChange = () => {
      window.sessionStorage.setItem("scrollPosition", window.scrollY);
    };
    window.addEventListener("scroll", handleScrollChange);

    return () => {
      window.removeEventListener("scroll", handleScrollChange);
    };
  }, [params]);

  useEffect(() => {
    window.sessionStorage.removeItem("scrollPosition");
  }, [usePathname()]);

  return (
    <div>
      {children}
      {params.has("sign-in") && (
        <Modal handleHide={handleCloseModal}>
          <SignIn />
        </Modal>
      )}
    </div>
  );
};

export default RootLayout;
