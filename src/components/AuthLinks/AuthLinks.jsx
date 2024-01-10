import React from "react";
import Link from "next/link";
import Commonbtn from "../Commonbtn/Commonbtn";
import { signOut } from "next-auth/react";

const AuthLinks = ({ status }) => {
  return (
    <>
      {status === "unauthenticated" ? (
        <>
          <Link href="/login">
            <Commonbtn text={"Login"} />
          </Link>
        </>
      ) : (
        <>
          <Link href="/write">Write</Link>
          <Commonbtn handleFunc={signOut} text={"Logout"} />
        </>
      )}
    </>
  );
};

export default AuthLinks;
