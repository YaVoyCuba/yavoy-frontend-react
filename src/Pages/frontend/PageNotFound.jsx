import React from "react";
import { Link } from "react-router-dom";

 

const PageNotFound = () => {
  return (
    <Link to="/">
      <span className="pl-1 font-medium text-lg">Got to home</span>
    </Link>
  );
};

export default PageNotFound;
