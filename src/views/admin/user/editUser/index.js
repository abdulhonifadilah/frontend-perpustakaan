import React from "react";
import { InputDataUser } from "../../../../components/molecule/inputdata";
import { withRouter } from "react-router-dom";
import AdminLayout from "../../../../components/molecule/layout/admin";

function EditUser(props) {
  const id = props.match.params.id;
  return (
    <AdminLayout>
      <div className="container flex flex-col justify-center items-center mt-5">
        <div className="flex flex-col justify-center items-center p-2 rounded shadow-md bg-white">
          <InputDataUser label="Edit User" id={id} />
        </div>
      </div>
    </AdminLayout>
  );
}

export default withRouter(EditUser);
