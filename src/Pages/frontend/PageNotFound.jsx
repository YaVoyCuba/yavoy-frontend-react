import React from "react";
import { Link } from "react-router-dom";

/**
* PageNotFound
* ------------
* No functional changes. 
* No scroll logic required: as it is a fallback route, the `useScrollToTop`
* hook centralized in TemplateLanding handles positioning the view
* below the sticky header. 
*/
const PageNotFound = () => {
  return (
    <Link to="/">
      <span className="pl-1 font-medium text-lg">Got to home</span>
    </Link>
  );
};

export default PageNotFound;
