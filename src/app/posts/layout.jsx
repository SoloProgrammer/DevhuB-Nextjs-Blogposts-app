import React from "react";

const RootLayout = ({ children, auth }) => {
  return (
    <div>
      {children}
      {auth}
    </div>
  );
};

export default RootLayout;
