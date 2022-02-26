import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { signout } from "../../../actions";
import { useDispatch } from "react-redux";

function DropdownProfil({ label, bg, atv, profil }) {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(signout());
  };
  const history = useHistory()
  const [Open, setOpen] = useState(false);
  const data = window.localStorage.getItem("user");
  const user = JSON.parse(data);
  const nama = user.nama;
  const res = nama.split(" ", 1);
  return (
    <div className="text-right w-28 font-montserrat text-gray-200 hover:text-white">
      <div className="flex flex-col">
        <div className="flex items-center justify-end">
          <button onClick={() => setOpen(!Open)} className="flex items-center capitalize">
            {res}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
        <div className={`${
            Open ? "block" : "hidden"} block items-start w-28`}>
          <ul
            className={`absolute ${bg} w-28 rounded-b-sm shadow-sm mt-3 justify-center py-0.5`}
          >
            <li className="">
            <button
                    className={`${atv} mb-1 py-0.5 md:mb-0 px-0.5 items-center flex justify-center w-full`}
                    onClick={()=>history.push(profil)}
                  >
                    Profil
                  </button>
            </li>
            <li className="">
            <button
                    className={`${atv} mb-1 py-0.5 md:mb-0 px-0.5 items-center flex justify-center w-full`}
                    onClick={logout}
                  >
                    Logout
                  </button>
            </li>
          </ul>
        </div>
      </div>
      
    </div>
  );
}

export default DropdownProfil;
