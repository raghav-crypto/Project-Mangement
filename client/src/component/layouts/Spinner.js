import React from "react";
import spinner from "./Spinner.gif";

export const Spinner = () => {
  return (
    <img
      src={spinner}
      alt="Loading"
      style={{ width: "200px", height: '200', margin: "auto", display: "block" }}
    />
  )
};
