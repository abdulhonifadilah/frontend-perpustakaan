import React from "react";import Btn from "../../../../components/atoms/btn";
import { IconUser } from "../../../../components/atoms/icons";
import { TabelUser } from "../../../../components/molecule/tabel";
import { useHistory } from 'react-router-dom';
import AdminLayout from "../../../../components/molecule/layout/admin";

function DaftarUser(props) {
  const history = useHistory();
  return (
    <AdminLayout>
          <div className="bg-white w-full py-5">
            <div className="flex flex-col md:flex-row container justify-center">
              <div className="flex flex-col justify-center items-center  w-full md:w-1/2">
                <IconUser/>
                <Btn
                onClick={()=>history.push('/admin/user/tambah')}
                  label="Tambah User"
                  color="bg-yellow-500 hover:bg-yellow-400 mt-1"
                />
              </div>
            </div>
          </div>
          <div className="container flex flex-col mt-3">
          <TabelUser/>
          </div>
    </AdminLayout>
  );
}

export default DaftarUser;
