import React from 'react';
import { InputDataProfil } from '../../../../components/molecule/inputdata';
import AdminLayout from '../../../../components/molecule/layout/admin';

function EditProfil(props) {
    return (
      <AdminLayout>
        <div className="container flex justify-center pt-5">
            <InputDataProfil/>
        </div>
      </AdminLayout>
    );
}

export default EditProfil;