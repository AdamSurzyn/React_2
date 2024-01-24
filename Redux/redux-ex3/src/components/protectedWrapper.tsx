import React from "react";
import { store } from "../store";
import { Link } from "react-router-dom";
const ProtectedWrapper = ({ children }: { children: React.ReactNode }) => {
  if (store.getState().login.value) {
    return <div>{children}</div>;
  } else {
    return <Link to="login">Please Log In first!</Link>;
  }
};

export default ProtectedWrapper;
