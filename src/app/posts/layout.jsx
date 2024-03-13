"use client";

import SignIn from "@/components/Auth/SignIn";
import Modal from "@/components/Modal/Modal";
import React, { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const RootLayout = ({ children }) => {
  const params = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  const handleCloseModal = () => {
    router.back();
  };

  useEffect(() => {
    // Save scroll position to the session storage when user scrolls the page 

    // Restore scroll position whenever path changes for eg when user redirects to ?sign-in route
    const restoreScrollPosition = () => {
      const scrollPosition = window.sessionStorage.getItem("scrollPosition");
      if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
      }
    };

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
  }, [path]);

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
