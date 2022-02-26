import React from "react";
import AdminLayout from "../../../../components/molecule/layout/admin";
import { TabelLaporan } from "../../../../components/molecule/tabel";


function DaftarLaporan(props) {
  
  return (
    <AdminLayout>
          <div className="container flex flex-col">
          <TabelLaporan/>
          </div>
    </AdminLayout>
  );
}

export default DaftarLaporan;
