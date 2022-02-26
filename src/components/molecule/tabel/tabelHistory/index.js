import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setDataPeminjamanUser, updatePeminjaman } from "../../../../actions";
import swal from "sweetalert";
import Btn from "../../../atoms/btn";
import ListBox from "../../listbox";
import Pagination from "../../pagination";

function TabelHistory() {
  const peminjaman = useSelector((state) => state.peminjaman);
  const dispatch = useDispatch();
  const history = useHistory();
  //set userID
  const user = JSON.parse(window.localStorage.getItem("user"));
  const [isCari, setIsCari] = useState(false)
  useEffect(() => {
    dispatch(setDataPeminjamanUser(user._id, user.nama));
    if (isCari) {
      setCurrentPage(1);
    }
  }, [dispatch, isCari, user._id, user.nama]);
  //filter
  const listStatus = ["Semua", "Dipinjam", "Dikembalikan", "Terkonfirmasi"];
  const [selected, setSelected] = useState("Semua");
  //setPagination
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 20; //jumlah data perhalaman
  const listPeminjaman = peminjaman.dataPeminjaman.filter((val) => {
    if (val.status.toLowerCase().includes(selected.toLowerCase())) {
      return val;
    } else if (selected.toLowerCase() === "semua") {
      return val;
    }else{
      return null;
    }
  });
  //panjang data seluruhnya
  const totalData = listPeminjaman.length;
  const lastPost = currentPage * postPerPage;
  const firstPost = lastPost - postPerPage;
  const totalPage = Math.ceil(totalData / postPerPage);

  //submit kembalikan
  const submitKembalikan = (id,idBuku) => {
    swal("Apakah buku akan dikembalikan", {
     buttons:{
        cancel:"Batal",
        confirm: {
          text: "Kembalikan",
          value: "dikembalikan",
        },
     }
    }).then(async (value) => {
      if (value === "dikembalikan") {
        await updatePeminjaman(id, idBuku,"dikembalikan")
        history.replace();
      }
    });
  };
  //set button
  const setBt = (status, id,idBuku) => {
    if (status === "dipinjam") {
      return (
        <Btn
          onClick={() => submitKembalikan(id,idBuku)}
          label="Kembalikan"
          color="text-blue-500"
        />
      );
    }
  };
  // set data kosong
  const dataKosong = (val) => {
    if (val.length === 0) {
      return (
        <div className="w-full text-center font-montserrat text-xs mb-5">
          ...Data kosong...
        </div>
      );
    }
  };
  return (
    <Fragment>
      <div className="mt-8 w-full flex justify-center mb-3">
        <h1 className="font-crimson font-bold text-gray-700">History</h1>
      </div>
      <div className="history px-2 flex flex-col items-center bg-white rounded-sm shadow-sm pb-2 min-h-full min-w-full">
        <div className="w-full border-b border-gray-500 flex py-1 justify-end">
          <div className="flex items-center my-3">
            <h1 className="mx-2 text-sm font-montserrat">Status</h1>
            <ListBox
              selected={selected}
              setSelected={setSelected}
              isValue={listStatus}
              setSearch={setIsCari}
            />
          </div>
        </div>
        <div className="w-full overflow-x-auto mb-3 font-montserrat">
          <table className="w-full table-fixed overflow-x-auto">
            <thead className="w-full border-double border-gray-600 border-b-2 pb-3">
              <tr className="items-center text-center">
                <th className="w-32 px-1 font-semibold text-xs pb-1">Judul</th>
                <th className="w-28 px-1  font-semibold text-xs pb-1">
                  Tanggal Pinjam
                </th>
                <th className="w-28 px-1  font-semibold text-xs pb-1">
                  Batas Pinjam
                </th>
                <th className="w-32 px-1  font-semibold text-xs pb-1">
                  Tanggal Kembali
                </th>
                <th className="w-24 px-1  font-semibold text-xs pb-1">
                  Status
                </th>
                <th className="w-28 px-1  font-semibold text-xs pb-1"></th>
              </tr>
            </thead>
            <tbody>
              {listPeminjaman.slice(firstPost, lastPost).map((peminjaman) => {
                    return (
                      <tr key={peminjaman._id}
                        className={`object-cover items-center hover:bg-gray-100 border-b border-gray-400 `}
                      >
                        <td className=" font-normal text-xs text-center w-32 items-center py-1 ">
                          {peminjaman.buku.judul}
                        </td>
                        <td className=" font-normal text-xs text-center w-28 items-center py-1">
                          {peminjaman.tanggal_pinjam}
                        </td>
                        <td className=" font-normal text-xs text-center w-28 items-center py-1">
                          {peminjaman.batas_kembali}
                        </td>
                        <td className=" font-normal text-xs text-center w-28 items-center py-1">
                          {peminjaman.tanggal_kembali}
                        </td>
                        <td className=" font-normal text-xs text-center w-24 items-center py-1">
                          {peminjaman.status}
                        </td>
                        <td className="w-28 items-center py-1">
                          <div className="flex justify-center items-center w-full h-full">
                            {setBt(peminjaman.status, peminjaman._id, peminjaman.buku.idBuku)}
                          </div>
                        </td>
                      </tr>
                    );
                })}
            </tbody>
          </table>
        </div>
        {dataKosong(peminjaman.dataPeminjaman)}
        <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={totalPage}
        />
      </div>
    </Fragment>
  );
}

export default TabelHistory;
