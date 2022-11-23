import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import LoginPage from "../../Pages/frontend/LoginPage";
import HeaderTop from "../Header/HeaderTop";

const TemplateUser = () => {
  const { token, user } = useSelector((state) => state.auth);
  const [login, setLogin] = useState(false);

  const checkAuth = () => {
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  console.log(token);

  

  useEffect(() => {
    checkAuth();
  }, [token]);

  return (
    <>
      {login ? (
        <>
          <div className="px-3">
            <HeaderTop />
            <Outlet />
          </div>
        </>
      ) : (
        <>
          <div className="p-1">
            <HeaderTop />
            <div className="p-3">
              <LoginPage />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TemplateUser;
