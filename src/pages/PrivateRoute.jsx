import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((s) => s.root.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/sign-in");
    }
  }, []);

  return children;
};

export default PrivateRoute;
