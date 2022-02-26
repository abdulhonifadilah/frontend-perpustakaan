import React, { Fragment, useState } from 'react';

export default function ListBox({selected, setSelected, isValue,setSearch}) {
  const setInSearch=()=>{
    if(setSearch){
      setSearch(1);
    }else{
      return null
    }
  }  
  const [Open, setOpen] = useState(false);
    return (
        <Fragment>
    <div className="text-right w-40 text-xs font-montserrat">
      <div className="relative flex-col bg-gray-100">
        <div className="border flex items-center justify-end rounded">
          <button value="honi" onClick={() => {setOpen(!Open)
          setInSearch();}} className="flex justify-between w-full items-center px-1 py-0.5 capitalize">
            {selected}
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
            Open ? "absolute" : "hidden"} absolute items-start w-full bg-gray-100 rounded-b-md`}>
          <ul
            className={` w-full justify-center`}
          >
            {isValue.map((val)=>{
              return(
                <li key={val} className=" border hover:bg-gray-50 border-gray-300">
            <button
                    className={`py-0.5 px-1 items-center flex justify-end w-full capitalize`}
                  onClick={()=>{setSelected(val);
                  setOpen(false)
                }}
                  >
                  {val}
                  </button>
            </li>
              )
              
            })}
            
            
          </ul>
        </div>
      </div>
    </div>
    </Fragment>
    )
}
