import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { LogoAnggota } from "../../../atoms/logo";
import DropdownProfil from "../../dropdown/DropdownProfil";
import { useDispatch } from "react-redux";
import { signout } from "../../../../actions";

function UserLayout(props) {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(signout());
  };
  const [Open, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="">
        <div className="bg-yellow-500">
          <div className="container md:py-2 flex flex-col md:flex-row justify-between md:items-center">
            <div className="text-white font-bold flex flex-row justify-between items-center w-full border-b border-yellow-400 md:border-none p-2 md:p-0">
              <div className="px-2 md:px-0">
                <NavLink to="/">
                  <LogoAnggota />
                </NavLink>
              </div>
              <button
                onClick={() => setOpen(!Open)}
                className="block md:hidden focus:outline-none px-2 md:px-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </button>
            </div>
            <div
              className={`${
                Open ? "block" : "hidden"
              } block md:flex md:flex-row text-white font-light  items-start md:items-center md:w-1/3 justify-between p-2 md:p-0`}
            >
              <div className="text-sm font-light flex flex-col md:p-1 md:w-1/2">
                <ul className="flex flex-col md:flex-row w-full ">
                  <li className="mr-3 mb-1 md:mb-0 px-1 items-center flex justify-center">
                    <NavLink
                      activeClassName="font-semibold"
                      className="font-montserrat text-gray-200 hover:text-gray-50 font-normal text-sm"
                      to="/buku"
                    >
                      Buku
                    </NavLink>
                  </li>
                  <li className="mr-3 mb-1 md:mb-0 px-1 items-center flex justify-center">
                    <NavLink
                      activeClassName="font-semibold"
                      className="font-montserrat text-gray-200 hover:text-gray-50 font-normal text-sm"
                      to="/history"
                    >
                      History
                    </NavLink>
                  </li>
                </ul>
                <ul className="flex flex-col w-full md:hidden">
                  <li className="mr-3 mb-1 md:mb-0 px-1 items-center flex justify-center ">
                    <NavLink
                      activeClassName="font-semibold"
                      className="font-montserrat text-gray-200 hover:text-gray-50 font-normal text-sm"
                      to="/profil"
                    >
                      Profil
                    </NavLink>
                  </li>
                  <li className="mr-3 mb-1 md:mb-0 px-1 items-center flex justify-center ">
                    <button
                      className="focus:outline-none font-montserrat text-gray-200 hover:text-white"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
              <div className="hidden md:block text-sm font-light">
                <DropdownProfil
                  profil="/profil"
                  bg="bg-yellow-500"
                  atv="hover:bg-yellow-400"
                />
              </div>
            </div>
          </div>
        </div>
        {/* child component */}
        {props.children}
      </div>
      <div className="">
        <div className="flex justify-center w-screen bg-white mt-14 mb-0 py-0.5">
          <p className="text-xs font-montserrat">
            &#169; Politeknik Baja Tegal 2021
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserLayout;
