import { useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const TemplateLanding = () => {
  const locationRouter = useLocation();

  const info = useSelector((state) => state.info.info);

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

  const path = locationRouter.pathname;

  return (
    <>
      <div className="px-3 lg:px-14 lg:max-w-7xl mx-auto">
        <Header
          info={info}
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
      <Footer info={info} />
    </>
  );
};

export default TemplateLanding;
