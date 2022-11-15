
import { setInfo } from "../../redux/infoSlice";
import { Link, Outlet, useLocation } from "react-router-dom";
import apiManager from "../../api/apiManager";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useEffect } from "react";
import { store } from "../../redux/store";

const TemplateLanding = () => {
  const locationRouter = useLocation();

 

  const tabs = [
    {
      name: "Restaurantes",
      href: "/restaurantes",
      current: true,
      rutes: [
        "",
        "restaurante",
        "producto",
        "restaurantes",
        "mercados",
        "dulcerias",
        "regalitos",
      ],
    },
    {
      name: "Alojamientos",
      href: "/alojamientos",
      current: false,
      rutes: ["alojamiento", "alojamientos"],
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const getInfo = async () => {
    let json = await apiManager.getGeneralData();
    if (json != 500) {
      store.dispatch(setInfo(json.settings));
    }
   }



  useEffect(() => {
    getInfo();
  }, [] );
  

  const path = locationRouter.pathname;

  return (
    <>
      <div className="px-3 lg:px-14 lg:max-w-7xl mx-auto">
        <Header
          
          locationType={path.split("/")[1] === "" ? "/" : path.split("/")[1]}
        />

        <div className="flex ">
          <div className=" mx-auto">
            <div className=" mb-3 border-gray-200">
              <nav className="-mb-px space-x-5  flex" aria-label="Tabs">
                {tabs.map((tab) => (
                  <Link
                    to={tab.href}
                    key={tab.name}
                    className={classNames(
                      tab.rutes.includes(path.split("/")[1])
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
        </div>
        <Outlet />
      </div>
      <Footer   />
    </>
  );
};

export default TemplateLanding;
