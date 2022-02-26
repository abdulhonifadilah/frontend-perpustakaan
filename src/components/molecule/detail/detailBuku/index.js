import React, { Fragment } from "react";
import ImgDetail from "../../../atoms/img";
import ParagrafDetail from "../../../atoms/label";

function BukuDetail({judul, pengarang, kategori, tahun, halaman, buku, deskripsi, img}) {
  return (
    <Fragment>
      <div className=" my-3">
        <h1 className="font-crimson font-bold text-gray-700 text-center">
                Detail Buku
              </h1>
      </div>
          <div className="p-3 flex flex-col md:flex-row justify-center items-center md:items-start">
        <ImgDetail imgUrl={img} />
        <div className="md:mx-2">
          <ParagrafDetail judul="Judul" ket={judul} />
          <ParagrafDetail judul="Pengarang" ket={pengarang} />
          <ParagrafDetail judul="Kategori" ket={kategori} />
          <ParagrafDetail judul="Tahun" ket={tahun} />
          <ParagrafDetail judul="Halaman" ket={halaman} />
          <ParagrafDetail judul="Jumlah Buku" ket={buku} />
          <ParagrafDetail
            judul="Deskripsi"
            ket={deskripsi}
          />
        </div>
      </div>
      
    </Fragment>
  );
}

export default BukuDetail;
