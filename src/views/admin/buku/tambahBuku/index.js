import React from "react";
import { InputDataBuku } from "../../../../components/molecule/inputdata";
import AdminLayout from "../../../../components/molecule/layout/admin";

function TambahBuku(props) {
  return (
    <AdminLayout>
      <div className="container flex flex-col justify-center items-center mt-5">
        <div className="flex flex-col justify-center items-center py-2 px-4 rounded-sm shadow-md bg-white">
          <InputDataBuku label="Tambah Buku" />
        </div>
      </div>
    </AdminLayout>
  );
}

export default TambahBuku;
