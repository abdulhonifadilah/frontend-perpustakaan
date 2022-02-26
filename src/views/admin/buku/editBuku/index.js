import React from "react";
import { withRouter } from "react-router-dom";
import InputDataBuku from "../../../../components/molecule/inputdata/buku";
import AdminLayout from "../../../../components/molecule/layout/admin";

function EditBuku(props) {
  const id = props.match.params.id;
  return (
    <AdminLayout>
      <div className="container flex flex-col justify-center items-center mt-5">
        <div className="flex flex-col justify-center items-center p-2 rounded shadow-md bg-white">
          <InputDataBuku label="Edit Buku" id={id} />
        </div>
      </div>
    </AdminLayout>
  );
}

export default withRouter(EditBuku);
