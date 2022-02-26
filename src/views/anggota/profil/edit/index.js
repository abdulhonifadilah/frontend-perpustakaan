import React from "react";
import { InputDataProfil } from "../../../../components/molecule/inputdata";
import UserLayout from "../../../../components/molecule/layout/user";

function EditProfilPage(props) {
  return (
    <UserLayout>
      <div className="container flex justify-center">
          <div className="mt-5">
            <InputDataProfil />
          </div>
        </div>
    </UserLayout>
  );
}

export default EditProfilPage;
