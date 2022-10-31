import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate, useLocation, Link } from "react-router-dom";
 
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const TemplateLanding = () => {

 

  const info = useSelector((state) => state.info.info.settings);

  // const tabs = [
  //   { name: "Restaurantes", href: "/restaurantes", current: true, rutes: ["/", "restaurante","producto","restaurantes"] },
  //   { name: "Alojamiento", href: "/alojamiento", current: false, rutes: ["/alojamiento" ] },
  // ];

 

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const location = useLocation();
  const isLoginPagePathname = location.pathname.includes("login");


  return (
    <>
      <div className="px-3 lg:px-14 lg:max-w-7xl mx-auto">
        <Header info={info} />

        {/* <div className="flex ">
          <div className=" mx-auto">
            <div className=" mb-3 border-gray-200">
              <nav className="-mb-px space-x-5  flex" aria-label="Tabs">
                {tabs.map((tab) => (
                  <Link
                    to={tab.href}
                    key={tab.name}
                    className={classNames(
                      useLocation().pathname.includes(tab.rutes.toString()) ||
                        (tab.current && useLocation().pathname === "/")
                        ? "border-b-2  border-orange-500 text-color "
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                      "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                    )}
                    aria-current={tab.current ? "page" : undefined}
                  >
                    {tab.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div> */}
        <Outlet />
      </div>
      {/* <Footer info={info} /> */}
    </>
  );
};

export default TemplateLanding;
