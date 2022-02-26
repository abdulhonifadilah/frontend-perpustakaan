import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";

function Card(props) {
  const history = useHistory();
  const role = window.localStorage.getItem('role');
  const onLink = ()=>{
    if(role === 'user'){
      history.push(`/buku/detail/${props._id}`)
    }else{
      history.push(`/admin/buku/detail/${props._id}`)
    }
  }
  return (
    <Fragment>
        <button onClick={onLink} className={`flex justify-center md:w-1/5 focus:outline-none`}>
          <div className="flex flex-col w-36 h-52 bg-white rounded-sm shadow-sm mx-2 my-2 hover:shadow-md">
            <div className=" bg-gray-100 w-full h-40 rounded-t-sm">
              <img src={props.imageUrl} alt="Buku" className="w-full h-40 object-contain" />
            </div>
            <div className="w-36 flex flex-col justify-center items-start text-sm font-light px-2 rounded-b-sm font-montserrat text-gray-800">
              <h1 className="truncate w-full text-sm text-left">{props.judul}</h1>
              <p className=" truncate text-xs w-full text-left">{props.pengarang}</p>
            </div>
          </div>
        </button>
    </Fragment>
  );
}

export default Card;
