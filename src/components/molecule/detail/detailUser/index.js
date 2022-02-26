import React, { Fragment } from "react";
import ImgDetail from "../../../atoms/img";
import ParagrafDetail from "../../../atoms/label";

function DetailUser(props) {
  return (
    <Fragment>
      <div className="my-3">
        <h1 className="font-crimson font-bold text-gray-700 text-center">
                Detail User
              </h1>
      </div>
      <div className="p-3 flex flex-col md:flex-row justify-center items-center md:items-start">
        <ImgDetail imgUrl={props.img} />
        <div className="md:mx-2">
          <ParagrafDetail judul="NIM/NIY/NIDN" ket={props.noId} />
          <ParagrafDetail judul="Nama" ket={props.nama} />
          <ParagrafDetail judul="Email" ket={props.email} />
          <ParagrafDetail judul="No Telp" ket={props.telp} />
          <ParagrafDetail judul="Role" ket={props.role} />
          <ParagrafDetail judul="Tipe" ket={props.tipe} />
        </div>
      </div>
    </Fragment>
  );
}

export default DetailUser;
