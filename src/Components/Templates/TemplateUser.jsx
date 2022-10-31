import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate, useLocation, useNavigate, Link } from "react-router-dom";

import { Error } from "../../common/Error";
import { Loading } from "../../common/Landing";
import { checkAuth, logout, selectSignin } from "../../redux/signinSlice";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const TemplateUser = () => {
 

  const { loading, loggedIn, error } = useSelector(selectSignin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tabs = [
    { name: "Restaurantes", href: "/restaurantes", current: true },
    { name: "Alojamiento", href: "/alojamiento", current: false },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }


  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return loading ? (
    <Loading />
  ) : (
    <>
      {error && <Error message={error.message} />}
      <RoutedComponent />
    </>
  );

  function RoutedComponent() {
    const location = useLocation();
    const isLoginPagePathname = location.pathname.includes("login");

    if (loggedIn) {
      if (isLoginPagePathname) {
        
        const { from = { pathname: "/" } } = location.state;

        return <Navigate to={from.pathname} state={{ from }} replace />;
      }

      return (
        <>
          <div className="px-3 lg:px-14 lg:max-w-7xl mx-auto">
            <Header />

            <div className="flex ">
              <div className=" mx-auto">
                <div className=" mb-3 border-gray-200">
                  <nav className="-mb-px   flex" aria-label="Tabs">
                    {tabs.map((tab) => (
                      <Link
                        to={tab.href}
                        key={tab.name}
                        className={classNames(
                          useLocation().pathname.includes(tab.href)
                            ? "border-red-600 text-gray-800 "
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                          " py-2 px-1 text-center border-b-2 font-medium text-sm mx-6"
                        )}
                        aria-current={tab.current ? "page" : undefined}
                      >
                        {tab.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
            <Outlet />
          </div>
          <Footer />

          <button
            onClick={async () => {
              await dispatch(logout());
              navigate("/");
            }}
          >
            Log Out
          </button>
        </>
      );
    } else {
      if (isLoginPagePathname) {
        return <Outlet />;
      }

      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }
};

export default TemplateUser;
