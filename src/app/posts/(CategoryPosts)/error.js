"use client";
const Error = () => {
  return (
    <div>
      Some error occured!
      <button onClick={() => window.location.reload()}>Try again</button>
    </div>
  );
};

export default Error;
