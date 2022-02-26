/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import Btn from "../../../../components/atoms/btn";
import Card from "../../../../components/molecule/card";
import { IconBuku, LoadingText } from "../../../../components/atoms/icons";
import { useSelector, useDispatch } from "react-redux";
import { setDataBuku } from "../../../../actions/buku.action";
import { useHistory, withRouter } from "react-router-dom";
import AdminLayout from "../../../../components/molecule/layout/admin";
import Pagination from "../../../../components/molecule/pagination";
function DaftarBuku(props) {
  const buku = useSelector((state) => state.buku);
  const dispatch = useDispatch();
  const [cari, setCari] = useState("");
  const history = useHistory();
  //setPagination
  const [isCari, setIsCari] = useState(false);
  const postPerPage = 10; //jumlah data perhalaman
  const [currentPage, setCurrentPage] = useState(1);
  const listBuku = buku.dataBuku.filter((val) => {
    if (cari === "") {
      return val;
    } else if (val.judul.toLowerCase().includes(cari.toLowerCase())) {
      return val;
    }
  });
  const totalData = listBuku.length; //panjang data seluruhnya
  const lastPost=currentPage*postPerPage
  const firstPost=lastPost-postPerPage;
  const totalPage=Math.ceil(totalData/postPerPage);
  useEffect(() => {
    dispatch(setDataBuku());
    if(isCari){
      setCurrentPage(1);
    }
  }, [dispatch, isCari]);
  //set data kosong
  const setKosong = (data) => {
    if (data.length === 0 && buku.show) {
      return (
        <h1 className="font-montserrat text-xs w-full text-center my-5">
          ...Data kosong...
        </h1>
      );
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white w-full py-5">
        <div className="flex flex-col md:flex-row container justify-center">
          <div className="flex flex-col justify-center items-center  w-full md:w-1/2">
            <IconBuku />
            <Btn
              onClick={() => history.push("/admin/buku/tambah")}
              label="Tambah Buku"
              color="bg-yellow-500 hover:bg-yellow-400 mt-1"
            />
          </div>
        </div>
      </div>
      <div className="container flex flex-col">
        <div className="flex flex-col justify-center items-center md:flex-row md:justify-between bg-white py-3 px-5 mt-5 rounded-sm shadow">
          <div className="flex justify-center items-center py-1 md:py-0">
            <h1 className="font-crimson font-bold text-gray-700 text-center">
              Daftar Buku
            </h1>
          </div>
          <div className="flex items-center py-1 md:py-0">
            <h3 className="text-gray-800 mx-2 text-xs">Cari</h3>

            <input
              type="text"
              name="search"
              className="focus:outline-none text-xs bg-gray-200 px-1 py-0.5 border-gray-300"
              placeholder="Cari......"
              onChange={(e) => {setCari(e.target.value)
              setIsCari(true);
              }}
            />
          </div>
        </div>
        <>{buku.show&&(
          <div className="flex flex-wrap justify-center mt-3">
          {listBuku
            .slice(firstPost, lastPost)
            .map((buku) => {
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
        </div>
        )}</>
        {!buku.show &&(<div className="flex w-full mt-16 justify-center"> <LoadingText/></div>)}
        {setKosong(buku.dataBuku)}
        <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={totalPage}
        />
      </div>
    </AdminLayout>
  );
}

export default withRouter(DaftarBuku);
