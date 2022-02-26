import React, { Fragment } from "react";
import ImgDetail  from "../../../atoms/img";
import ParagrafDetail from "../../../atoms/label";

function DataDetailLaporan(props) {
  return (
    <Fragment>
      <div className=" my-3">
        <h1 className="font-crimson font-bold text-gray-700 text-center">
          Detail Laporan
        </h1>
      </div>
      <div className="p-3 flex flex-col md:flex-row justify-center items-center md:items-start">
        <ImgDetail imgUrl={props.img} />
        <div className="md:mx-2">
          <ParagrafDetail judul="Judul" ket={props.judul} />
          <ParagrafDetail judul="Peminjam" ket={props.peminjam} />
          <ParagrafDetail judul="Tanggal Pinjam" ket={props.tanggalPinjam} />
          <ParagrafDetail judul="Batas Pinjam" ket={props.batasPinjam} />
          <ParagrafDetail judul="Tanggal Kembali" ket={props.tanggalKembali} />
          <ParagrafDetail judul="Status" ket={props.status} />
          <ParagrafDetail judul="Admin" ket={props.admin} />
        </div>
      </div>
    </Fragment>
  );
}

export default DataDetailLaporan;
