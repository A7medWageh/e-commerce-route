import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon, HomeIcon, CubeIcon, TagIcon, BuildingStorefrontIcon, ShoppingCartIcon, HeartIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect } from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";

import { AuthContext } from "../../Context/AuthContext";

const navigation = [
  { name: "Home", to: "/", current: true, icon: HomeIcon },
  { name: "Products", to: "/ProductsPage", current: false, icon: CubeIcon },
  { name: "Categories", to: "/Categories", current: false, icon: TagIcon },
  { name: "Brands", to: "/Brands", current: false, icon: BuildingStorefrontIcon },
  { name: "MyCart", to: "/Carts", current: false, icon: ShoppingCartIcon },
  { name: "WishList", to: "/WishList", current: false, icon: HeartIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  let { UserToken, setUserToken } = useContext(AuthContext);
  const navigate = useNavigate();

  function signOut() {
    setUserToken("");
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <Disclosure as="nav" className="bg-slate-950 overflow-hidden">
      <div className="mx-auto max-w-7xl px-2 md:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <h1 className="text-3xl text-primary font-bold">FreshCart</h1>
          </div>

          <div className="flex justify-end flex-1 md:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>

          <div className="hidden md:flex  sm:ml-6 sm:items-center">
            <div className="flex md:space-x-1 lg:space-x-3">
              {UserToken &&
                navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current ? "bg-primary text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium flex items-center space-x-1"
                    )}
                  >
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                    <span>{item.name}</span>
                  </NavLink>
                ))}
              {UserToken && (
                <button
                  onClick={signOut}
                  className="bg-red-600 text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Sign Out
                </button>
              )}
              <>
                {!UserToken && (
                  <ul className="flex gap-x-3 items-center justify-center text-center">
                    <li>
                      <NavLink
                        to={"/login"}
                        className="px-3 py-2 text-white bg-primary rounded-lg"
                      >
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/register"}
                        className="px-3 py-2 text-white bg-primary rounded-lg"
                      >
                        register
                      </NavLink>
                    </li>
                  </ul>
                )}
              </>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <DisclosurePanel className="md:hidden">
        <div className="space-y-2 px-2 pb-3 pt-2">
          {UserToken &&
            navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-primary text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium flex items-center space-x-2"
                )}
              >
                <item.icon className="h-6 w-6" aria-hidden="true" />
                <span>{item.name}</span>
              </Link>
            ))}
          {UserToken && (
            <button
              onClick={signOut}
              className="w-full text-left text-red-500 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Sign Out
            </button>
          )}
          {!UserToken && (
            <>
              <Link
                to="/login"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
