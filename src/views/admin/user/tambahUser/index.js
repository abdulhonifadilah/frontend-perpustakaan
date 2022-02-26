import React from "react";
import { InputDataUser } from "../../../../components/molecule/inputdata";
import AdminLayout from "../../../../components/molecule/layout/admin";

function TambahUser(props) {
  return (
    <AdminLayout>
      <div className="container flex flex-col justify-center items-center mt-5">
        <div className="flex flex-col justify-center items-center p-2 rounded shadow-md bg-white">
          <InputDataUser label="tambah user" />
        </div>
      </div>
    </AdminLayout>
  );
}

export default TambahUser;
