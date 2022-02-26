import React, { useEffect, useState } from "react";
import Card from "../../../../components/molecule/card";
import { useDispatch, useSelector } from "react-redux";
import { setDataBuku } from "../../../../actions";
import UserLayout from "../../../../components/molecule/layout/user";
import Pagination from "../../../../components/molecule/pagination";

function Buku() {
  const buku = useSelector((state) => state.buku);
  const dispatch = useDispatch();
  const [cari, setCari] = useState("");
  const [isCari, setIsCari] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(setDataBuku());
    if(isCari){
      setCurrentPage(1);
    }
  }, [dispatch, isCari]);
  //setPagination
  const postPerPage = 20; //jumlah data perhalaman
  const listBuku = buku.dataBuku.filter((val) => {
    if (cari === "") {
      return val;
    } else if (val.judul.toLowerCase().includes(cari.toLowerCase())) {
      return val;
    } else {
      return null;
    }
  });
  const totalData = listBuku.length; //panjang data seluruhnya
  const lastPost=currentPage*postPerPage
  const firstPost=lastPost-postPerPage;
  const totalPage=Math.ceil(totalData/postPerPage);
  
  //set data kosong
  const dataKosong = (val) => {
    if (val.length === 0) {
      return (
        <div className="w-full text-center font-montserrat text-xs mt-5">
          ...Data kosong...
        </div>
      );
    }
  };
  return (
    <UserLayout>
      <div className="container flex flex-col">
        <div className="flex flex-col md:flex-row justify-center items-center md:justify-between py-2 px-2 bg-white mt-12 shadow-sm rounded-sm">
          <div className="p-1 md:p-0 flex items-center justify-center">
            <h1 className="font-crimson font-bold text-gray-700">
              Daftar Buku
            </h1>
          </div>
          <div className="flex items-center">
            <h3 className="text-gray-800 mx-2 text-xs">Cari</h3>

            <input
              type="text"
              name="search"
              className="focus:outline-none text-xs bg-gray-200 px-1 py-0.5 border-gray-300"
              placeholder="Cari......"
              onChange={(e) => {
                setCari(e.target.value);
                setIsCari(true);
              }}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-center mt-3">
          {listBuku.slice(firstPost, lastPost).map((buku) => {
            return (
              <Card
                key={buku._id}
                imageUrl={`http://localhost:4000/${buku.foto}`}
                judul={buku.judul}
                pengarang={buku.pengarang}
                _id={buku._id}
              />
            );
          })}
          {dataKosong(buku.dataBuku)}
          <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={totalPage}
          />
        </div>
      </div>
    </UserLayout>
  );
}

export default Buku;
