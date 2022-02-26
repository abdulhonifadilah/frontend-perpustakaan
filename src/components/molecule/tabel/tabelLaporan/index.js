import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  deletPeminjaman,
  setDataPeminjaman,
  updatePeminjaman,
} from "../../../../actions";
import swal from "sweetalert";
import ListBox from "../../listbox";
import Pagination from "../../pagination";
import { IconHapus, IconDetail, IconKonfirm } from "../../../atoms/icons";

function TabelLaporan(props) {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const namaUser = user.nama;
  const history = useHistory();
  const peminjaman = useSelector((state) => state.peminjaman);
  const dispatch = useDispatch();
  const listStatus = ["Semua", "Dipinjam", "Dikembalikan", "Terkonfirmasi"];
  const [selected, setSelected] = useState("Semua");
  const [isCari, setIsCari] = useState(false);
  
  useEffect(() => {
    dispatch(setDataPeminjaman());
    if (isCari) {
      setCurrentPage(1);
    }
  }, [dispatch, history, isCari, peminjaman.dataPeminjaman]);

  const postPerPage = 20; //jumlah data perhalaman
  const [currentPage, setCurrentPage] = useState(1);
  const listPeminjaman = peminjaman.dataPeminjaman.filter((val) => {
    if (val.status.toLowerCase().includes(selected.toLowerCase())) {
      return val;
    } else if (selected.toLowerCase() === "semua") {
      return val;
    } else {
      return null;
    }
  });
  //panjang data seluruhnya
  const totalData = listPeminjaman.length;
  const lastPost = currentPage * postPerPage;
  const firstPost = lastPost - postPerPage;
  const totalPage = Math.ceil(totalData / postPerPage);
  // console.log(totalData);
  //set data kosong
  const setKosong = (data) => {
    if (data.length === 0) {
      return (
        <h1 className="font-montserrat text-xs w-full text-center my-5">
          ...Data kosong...
        </h1>
      );
    }
  };
  //konfirmasi
  const setKonfirmasi = (id, idBuku) => {
    swal("Apa kah buku sudah di kembalikan?", {
      buttons: {
        cancel: "batal",
        confirm: {
          text: "Konfirmasi",
          value: "konfirmasi",
        },
      },
    }).then(async (value) => {
      if (value === "konfirmasi") {
        await updatePeminjaman(id, idBuku, "terkonfirmasi", namaUser);
        history.replace();
      }
    });
  };

  const onDelete = (id) => {
    swal("Apa anda yakin akan menghapus Laporan ini", {
      dangerMode: true,
      buttons: {
        cancel: "Batal",
        confirm: {
          text: "Hapus",
          value: "hapus",
        },
      },
    }).then((value) => {
      if (value === "hapus") {
        deletPeminjaman(id);
        history.replace();
      }
    });
  };
  //disabled state
  const setBt = (status, id, idBuku) => {
    if (status === "dikembalikan") {
      return (
        <button
          onClick={() => setKonfirmasi(id, idBuku)}
          className="mx-1 focus:outline-none"
        >
          <IconKonfirm />
        </button>
      );
    } else if (status === "terkonfirmasi") {
      return (
        <button
          onClick={() => onDelete(id)}
          className="mx-1 focus:outline-none"
        >
          <IconHapus />
        </button>
      );
    }
  };
  return (
    <Fragment>
      <button></button>
      <div className="flex flex-col">
        <div className="mt-8 w-full flex justify-start mb-4 mx-7">
          <h1 className="font-crimson font-bold text-gray-700">Laporan</h1>
        </div>
        <div className="history flex flex-col bg-white rounded-sm shadow-sm pb-2 px-2 py-3">
          <div className=" border-b border-gray-500 flex py-1 justify-end pb-2">
            <div className="flex items-center">
              <h1 className="mx-2 text-sm">Status</h1>
              <ListBox
                selected={selected}
                setSelected={setSelected}
                isValue={listStatus}
                setSearch={setIsCari}
              />
            </div>
          </div>
          <div className="overflow-x-auto font-montserrat">
            <table className="table-fixed w-full overflow-x-auto mb-2">
              <thead className="border-double border-gray-600 border-b-2 pb-3">
                <tr className="">
                  <th className="w-28 mx-1 px-1 font-semibold text-xs py-1">
                    Judul
                  </th>
                  <th className="w-28 mx-1 px-1 font-semibold text-xs py-1">
                    Anggota
                  </th>
                  <th className="w-36 mx-1 px-1 font-semibold text-xs py-1">
                    Tanggal Pinjam
                  </th>
                  <th className="w-36 mx-1 px-1 font-semibold text-xs py-1">
                    Tanggal Kembali
                  </th>
                  <th className="w-24 mx-1 px-1 font-semibold text-xs py-1">
                    Status
                  </th>
                  <th className="w-28 mx-1 px-1 font-semibold text-xs py-1"></th>
                </tr>
              </thead>
              <tbody>
                {peminjaman.show&&(
                  listPeminjaman.slice(firstPost, lastPost).map((peminjaman) => {
                  return (
                    <tr
                      key={peminjaman._id}
                      className="object-cover items-center hover:bg-blue-100 border-b cursor-pointer border-gray-400"
                    >
                      <td className=" font-normal text-xs py-1 text-center w-28 items-center ">
                        {peminjaman.buku.judul}
                      </td>
                      <td className=" font-normal text-xs py-1 text-center w-28 items-center ">
                        {peminjaman.anggota.anggota}
                      </td>
                      <td className=" font-normal text-xs py-1 text-center w-36 items-center overflow-hidden">
                        {peminjaman.tanggal_pinjam}
                      </td>
                      <td className=" font-normal text-xs py-1 text-center w-36 items-center ">
                        {peminjaman.tanggal_kembali}
                      </td>
                      <td className=" font-normal text-xs py-1 text-center w-24 items-center ">
                        {peminjaman.status}
                      </td>
                      <td className="w-28 items-center py-1">
                        <div className="flex justify-center items-center w-full h-full">
                          <button
                            onClick={() =>
                              history.push(
                                `/admin/laporan/detail/${peminjaman._id}`
                              )
                            }
                            className="mx-1 focus:outline-none"
                          >
                            <IconDetail />
                          </button>
                          {setBt(
                            peminjaman.status,
                            peminjaman._id,
                            peminjaman.buku.idBuku
                          )}
                          <button></button>
                        </div>
                      </td>
                    </tr>
                  );
                })
                )}
              </tbody>
            </table>
          </div>
          {setKosong(peminjaman.dataPeminjaman)}
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={totalPage}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default TabelLaporan;
