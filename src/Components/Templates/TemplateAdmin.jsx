import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Outlet,
  Navigate,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";
import FooterAdmin from "../Footer/FooterAdmin";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { Error } from "../../common/Error";
import { Loading } from "../../common/Landing";
import { checkAuth, logout, selectSignin } from "../../redux/signinSlice";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const TemplateAdmin = () => {
  const { loading, loggedIn, error } = useSelector(selectSignin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = {
    name: "Tom Cook",
    email: "tom@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  };
  const navigation = [
    { name: "Escritorio", href: "/admin/home" },
    { name: "Pedidos", href: "/admin/pedidos" },
    { name: "Balances", href: "/admin/economia" },
    { name: "Usuarios", href: "/admin/usuarios" },
    { name: "Comercios", href: "/admin/comercios" },
  ];
  const userNavigation = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "#" },
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
          <div className="min-h-full">
            <Disclosure as="nav" className="bg-main">
              {({ open }) => (
                <>
                  <div className="flex flex-col"></div>
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Link to="/" className="flex">
                            <img
                              className="h-7 w-auto"
                              src="/assets/img/rentalho.png"
                              alt="RentalHo"
                            />
                            <span className="pl-1 font-medium text-white text-lg">
                              Market
                            </span>
                          </Link>
                        </div>
                        <div className="hidden md:block">
                          <div className="ml-10 flex items-baseline space-x-4">
                            {navigation.map((item) => (
                              <Link
                                key={item.name}
                                to={item.href}
                                className={classNames(
                                  useLocation().pathname.includes(item.href)
                                    ? "bg-green text-white"
                                    : "text-white hover:bg-green hover:bg-opacity-75",
                                  "px-3 py-2 rounded-md text-sm font-medium"
                                )}
                                aria-current={item.current ? "page" : undefined}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                          <button
                            type="button"
                            className="rounded-full bg-green p-1 text-green-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600"
                          >
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                          {/* Profile dropdown */}
                          <Menu as="div" className="relative ml-3">
                            <div>
                              <Menu.Button className="flex max-w-xs items-center rounded-full bg-green text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600">
                                <span className="sr-only">Open user menu</span>
                                <img
                                  className="h-8 w-8 rounded-full"
                                  src={user.imageUrl}
                                  alt=""
                                />
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {userNavigation.map((item) => (
                                  <Menu.Item key={item.name}>
                                    {({ active }) => (
                                      <a
                                        href={item.href}
                                        className={classNames(
                                          active ? "bg-gray-100" : "",
                                          "block px-4 py-2 text-sm text-gray-700"
                                        )}
                                      >
                                        {item.name}
                                      </a>
                                    )}
                                  </Menu.Item>
                                ))}
                                <Menu.Item key={'logoutPC'}>
                                  {({ active }) => (
                                    <a
                                      onClick={async () => {
                                        await dispatch(logout());
                                        navigate("/");
                                      }}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 cursor-pointer py-2 text-sm text-gray-700"
                                      )}
                                    >
                                     Cerrar sessión
                                    </a>
                                  )}
                                </Menu.Item>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </div>
                      <div className="-mr-2 flex md:hidden">
                        {/* Mobile menu button */}
                        <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-green p-2 text-green-200 hover:bg-green-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600">
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XMarkIcon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <Bars3Icon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </Disclosure.Button>
                      </div>
                    </div>
                  </div>

                  <Disclosure.Panel className="md:hidden">
                    <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                      {navigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-green text-white"
                              : "text-white hover:bg-green hover:bg-opacity-75",
                            "block px-3 py-2 rounded-md text-base font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                    <div className="border-t border-green-700 pt-4 pb-3">
                      <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={user.imageUrl}
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <div className="text-base font-medium text-white">
                            {user.name}
                          </div>
                          <div className="text-sm font-medium text-green-300">
                            {user.email}
                          </div>
                        </div>
                        <button
                          type="button"
                          className="ml-auto flex-shrink-0 rounded-full bg-main p-1 text-green-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600"
                        >
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="mt-3 space-y-1 px-2">
                        {userNavigation.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-green-500 hover:bg-opacity-75"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                        <Disclosure.Button
                          onClick={async () => {
                            await dispatch(logout());
                            navigate("/");
                          }}
                          key={"logout"}
                          className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-green-500 hover:bg-opacity-75"
                        >
                          Cerrar sessión
                        </Disclosure.Button>
                      </div>
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>

          <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
          <FooterAdmin />
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

export default TemplateAdmin;
