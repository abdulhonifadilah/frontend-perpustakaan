import React from "react";
import Btn from "../../../components/atoms/btn";
import { IconUser, IconBuku } from "../../../components/atoms/icons";
import { TabelLaporan } from "../../../components/molecule/tabel";
import { useHistory } from "react-router-dom";
import AdminLayout from "../../../components/molecule/layout/admin";

function Dasboard(props) {
  const history = useHistory();
  return (
    <AdminLayout>
      <div className="bg-white w-full py-5">
        <div className="flex flex-col md:flex-row container justify-between">
          <div className="flex flex-col justify-center items-center w-full md:w-1/2 ">
            <IconUser />
            <Btn
              label="Tambah User"
              color="bg-yellow-500 hover:bg-yellow-400 mt-2"
              onClick={() => history.push("/admin/user/tambah")}
            />
          </div>
          <div className="flex flex-col justify-center items-center  w-full md:w-1/2 mt-5 md:mt-0">
            <IconBuku />
            <Btn
              label="Tambah Buku"
              color="bg-yellow-500 hover:bg-yellow-400 mt-1"
              onClick={() => history.push("/admin/buku/tambah")}
            />
          </div>
        </div>
      </div>
      <div className="container flex flex-col">
        <TabelLaporan />
      </div>
    </AdminLayout>
  );
}

export default Dasboard;
