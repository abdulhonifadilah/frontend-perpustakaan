/* eslint-disable array-callback-return */
import React, { Fragment, useEffect, useState } from "react";
import Card from "../../../components/molecule/card";
import { useDispatch, useSelector } from "react-redux";
import { setDataBuku } from "../../../actions";
import { useHistory } from "react-router-dom";
import UserLayout from "../../../components/molecule/layout/user";

function Homepage(props) {
  const history = useHistory();

  const buku = useSelector((state) => state.buku);
  const dispatch = useDispatch();
  const [cari, setCari] = useState("");
  useEffect(() => {
    dispatch(setDataBuku());
  }, [dispatch]);

  //set data kosong
  const dataKosong = (val) => {
    if (val.length === 0) {
      return( <div className="w-full text-center font-montserrat text-xs mb-5">...Data kosong...</div>)
    }
  };

  return (
    <Fragment>
      <UserLayout>
        <div className="flex justify-center items-center bg-white">
          <div className="relative flex-col items-center my-10">
            <div className="flex items-center py-1 md:py-0">
              <h3 className=" font-montserrat text-gray-800 mx-2 text-xs">
                Cari
              </h3>

              <input
                type="text"
                name="search"
                className="shadow focus:outline-none text-xs bg-gray-200 px-1 py-0.5 border-gray-300"
                placeholder="Cari Buku..."
                autoComplete="off"
                onChange={(e) => setCari(e.target.value)}
              />
            </div>
            <div className=" bg-gray-100 absolute ml-9 mt-1">
              <ul>
                {buku.dataBuku.filter((val) => {
                    if (cari === "") {
                      return null;
                    } else if (
                      val.judul.toLowerCase().includes(cari.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((buku) => {
                    return (
                      <li
                        onClick={() => history.push(`/buku/detail/${buku._id}`)}
                        className=" cursor-pointer px-2 hover:bg-gray-200 text-xs font-montserrat"
                      >
                        {buku.judul}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
        <div className="container flex flex-col mt-14">
          <div className="flex justify-center">
            <h1 className="mb-5 font-crimson font-bold text-gray-700">
              Buku Terbaru
            </h1>
          </div>
          <div className="flex flex-row overflow-x-auto">
            {buku.dataBuku.slice(0, 5).map((buku) => {
              
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
          </div>
          <div className="w-full flex justify-center">
            <div className="flex flex-col md:flex-row my-14 justify-between items-center w-80">
              <button
                className="font-crimson font-bold w-32 py-1 bg-blue-600 rounded-sm text-white shadow-md hover:bg-blue-500 hover:shadow-none focus:outline-none"
                onClick={() => history.push("/buku")}
              >
                Daftar Buku
              </button>
              <button
                className="font-crimson font-bold w-40 py-1 border-b border-gray-700 text-7ray-800 hover:text-gray-600 hover:border-gray-600 p-1 focus:outline-none"
                onClick={() => history.push("/history")}
              >
                History Peminjaman
              </button>
            </div>
          </div>
        </div>
      </UserLayout>
    </Fragment>
  );
}

export default Homepage;
