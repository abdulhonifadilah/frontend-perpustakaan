import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";

function Index(props) {
  const history = useHistory();
  const role = window.localStorage.getItem('role');

  const onLink = ()=>{
    if(role === 'user'){
      history.push(`/profil/edit`)
    }else{
      history.push(`/admin/profil/edit`)
    }
  }
  return (
    
    <Fragment>
      <div className="flex-flex-col justify-center">
        <div className="w-full flex justify-center mb-5">
          <h1 className="font-crimson font-bold text-gray-700">Profil</h1>
        </div>
        <div className="flex flex-col bg-white p-5 rounded shadow">
          <div className="flex flex-col md:flex-row justify-center w-full items-center">
            <img src={props.img} alt="pict" className=" object-cover w-28 h-28 bg-gray-300 mr-3" />
            <div className="flex flex-col my-1 w-40 mt-3 md:mt-0 overflow-hidden font-montserrat">
              <div className="mb-2 border-b border-gray-600">
                <p className=" uppercase font-semibold text-sm truncate">{props.nama}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-xs font-light">{props.noId}</p>
                <p className="text-xs font-light">{props.tipe}</p>
                <p className="text-xs font-light">{props.email}</p>
                <p className="text-xs font-light">{props.telp}</p>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <button
              className="flex justify-center items-center bg-gray-400 text-gray-700 hover:bg-gray-300 px-3 py-0.5 text-xs mt-3 rounded-sm hover:shadow-md hover:text-gray-600"
              onClick={onLink}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 mr-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Setting
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Index;
