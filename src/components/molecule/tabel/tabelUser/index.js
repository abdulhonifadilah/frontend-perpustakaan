import React, { Fragment, useEffect, useState } from "react";
import { IconDetail, IconHapus } from "../../../atoms/icons";
import { deleteUser, setDataUser } from "../../../../actions";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import ListBox from "../../listbox";
import Pagination from "../../pagination";
import { useDispatch, useSelector } from "react-redux";

function TableUser({setUser}) {
  const history = useHistory();
  const [cari, setCari] = useState("");
  const userId = JSON.parse(window.localStorage.getItem("user"));
  const setId = userId._id;
  // dropdown
  const listStatus = ["semua", "admin", "user"];
  const [selected, setSelected] = useState("semua");
  const user = useSelector((state)=> state.user)
  const dispatch= useDispatch();
  useEffect(() => {
    dispatch(setDataUser());
  }, [dispatch])
  //setPagination
  const postPerPage = 20; //jumlah data perhalaman
  const [currentPage, setCurrentPage] = useState(1);
  const listUser = user.dataUser.filter((val) => {
    if (val._id.toLowerCase().includes(setId.toLowerCase())) {
      return null;
    } else if (cari === "" && selected.toLowerCase() === "semua") {
      return val;
    }else if (
      val.nama.toLowerCase().includes(cari.toLowerCase()) && selected.toLowerCase() === "semua"
    ) {
      return val;
    } else if (
      val.nama.toLowerCase().includes(cari.toLowerCase()) &&
      val.role.toLowerCase().includes(selected.toLowerCase())
    ) {
      return val;
    } else {
      return null;
    }
  });
  const totalData = listUser.length - 1; //panjang data seluruhnya - admin yang akses
  const lastPost = currentPage * postPerPage;
  const firstPost = lastPost - postPerPage;
  const totalPage = Math.ceil(totalData / postPerPage);
  //set data kosong
  const setKosong = (list) => {
    if (list.length === 0) {
      return (
        <h1 className="font-montserrat text-xs w-full text-center my-5">
          ...Data kosong...
        </h1>
      );
    }
  };
  
  const onDelete = (id) => {
    swal("Apa anda yakin akan menghapus User ini", {
      dangerMode: true,
      buttons: {
        cancel: "Batal",
        confirm: {
          text: "Hapus",
          value: "hapus",
        },
      },
    }).then( (value) => {
      if (value === "hapus") {
        deleteUser(id);
        history.replace()
      }
    });
  };

  return (
    <Fragment>
      <div className="flex mx-10">
        <h1 className="font-crimson font-bold text-gray-700 text-center">
          User
        </h1>
      </div>
      <div className="flex flex-col items-center md:justify-between bg-white py-3 md:px-5 mt-5 rounded-sm shadow">
        <div className="flex flex-col py-1 px-5 md:py-0 w-full justify-start md:justify-between md:items-center">
          <div className="flex flex-col md:flex-row w-full justify-center items-center md:justify-between border-b py-1 border-gray-300 pb-1">
            <div className="flex justify-center items-center mx-2 md:mx-0 md:justify-start w-full">
              <h3 className=" font-montserrat text-gray-800 mx-2 text-xs">
                Cari
              </h3>
              <input
                type="text"
                name="search"
                className="focus:outline-none text-xs bg-gray-200 px-1 py-0.5 border-gray-300"
                placeholder="Cari......"
                onChange={(e) => {
                  setCari(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <div className="flex md:mt-0 w-full justify-end">
              <div className="flex items-center">
                <h1 className="mx-2 text-sm">Tipe</h1>
                <ListBox
                  selected={selected}
                  setSelected={setSelected}
                  isValue={listStatus}
                  setSearch={setCurrentPage}
                />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto mt-1 font-montserrat">
            <table className="table-fixed overflow-x-auto">
              <thead className="border-double border-gray-600 border-b-2 pb-3">
                <tr>
                  <th className="w-28 px-5 font-semibold text-xs pb-1">Foto</th>
                  <th className="w-28 px-5 font-semibold text-xs pb-1">
                    NIM/NIDN/NIY
                  </th>
                  <th className="w-32 px-5 font-semibold text-xs pb-1">NAMA</th>
                  <th className="w-28 px-5 font-semibold text-xs pb-1">Role</th>
                  <th className="w-28 px-5 font-semibold text-xs pb-1">tipe</th>
                  <th className="w-28 px-5 font-semibold text-xs pb-1"></th>
                </tr>
              </thead>
              <tbody>
                {listUser.slice(firstPost, lastPost).map((user) => {
                  return (
                    <tr
                      key={user._id}
                      className={` object-cover items-center hover:bg-gray-100 border-b border-gray-400`}
                    >
                      <td className="w-28 flex justify-center items-center">
                        <img
                          className=" object-cover w-10 h-10 rounded-full bg-gray-300"
                          src={`http://localhost:4000/${user.foto}`}
                          alt="img profile"
                        />
                      </td>
                      <td className=" font-normal text-xs py-1 text-center w-28 items-center ">
                        {user.nim_nidn_niy}
                      </td>
                      <td className=" font-normal text-xs py-1 text-center w-32 items-center overflow-hidden">
                        {user.nama}
                      </td>
                      <td className=" font-normal text-xs py-1 text-center w-28 items-center ">
                        {user.role}
                      </td>
                      <td className=" font-normal text-xs py-1 text-center w-28 items-center ">
                        {user.tipe}
                      </td>
                      <td className="w-28 items-center py-1">
                        <div className="flex justify-center items-center w-full h-full">
                          <button
                            onClick={() =>
                              history.push(`/admin/user/detail/${user._id}`)
                            }
                            className="mx-1 focus:outline-none"
                          >
                            <IconDetail />
                          </button>
                          <button
                            onClick={() => onDelete(user._id)}
                            className="mx-1 focus:outline-none"
                          >
                            <IconHapus />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {setKosong(listUser)}
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

export default TableUser;
