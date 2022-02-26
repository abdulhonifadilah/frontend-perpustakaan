import React, { useEffect } from "react";import { DetailProfil } from "../../../../components/molecule/detail";
import AdminLayout from "../../../../components/molecule/layout/admin";
import { setDataUserById } from "../../../../actions";
import { useDispatch, useSelector } from "react-redux";
import { LoadingText } from "../../../../components/atoms/icons";

function Profil(props) {
  const dispatch= useDispatch()
  const user = JSON.parse(window.localStorage.getItem("user"));
const {dataUserById, show}=useSelector((state)=>state.user)
  useEffect(() => {
    dispatch(setDataUserById(user._id))
  }, [dispatch, user._id]);

  return (
    <AdminLayout>
      <div className="container flex justify-center">
          <div className="mt-5">
            {show&&(
              <DetailProfil
              img={`http://localhost:4000/${dataUserById.foto}`}
              noId={dataUserById.nim_nidn_niy}
              nama={dataUserById.nama}
              tipe={dataUserById.tipe}
              email={dataUserById.email}
              telp={dataUserById.telp}
            />
            )}
            {!show&&(
              <LoadingText/>
            )}
            
          </div>
        </div>
    </AdminLayout>
  );
}

export default Profil;
