import React, { Fragment, useEffect, useState } from "react";
import InputProfil from "../../../atoms/input/inputProfil";
import Btn from "../../../atoms/btn";
import { useDispatch, useSelector } from "react-redux";
import {
  setDataUserById,
  setFormUser,
  setImgPreview,
  updateUserToAPI,
} from "../../../../actions";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

function InputDataProfil() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = JSON.parse(window.localStorage.getItem("user"));
  const { formUser, imgPreview, dataUserById } = useSelector(
    (state) => state.user
  );
const [sukses, setsukses] = useState(false)
  useEffect(() => {
    setDataUserById(user._id);
    dispatch(setFormUser("nama", dataUserById.nama));
    dispatch(setFormUser("noId", dataUserById.nim_nidn_niy));
    dispatch(setFormUser("email", dataUserById.email));
    dispatch(setFormUser("role", dataUserById.role));
    dispatch(setFormUser("tipe", dataUserById.tipe));
    dispatch(setFormUser("telp", dataUserById.telp));
    dispatch(setFormUser("password", ""));
    dispatch(setFormUser("image", ""));
    //password kosong
    dispatch(setImgPreview(`http://localhost:4000/${dataUserById.foto}`));
    if(sukses){
      history.goBack();
    }
  }, [dataUserById.email, dataUserById.foto, dataUserById.nama, dataUserById.nim_nidn_niy, dataUserById.role, dataUserById.telp, dataUserById.tipe, dispatch, history, sukses, user._id]);
  const { email, telp, password } = formUser;
  //img preview
  const onImageUpload = (e) => {
    const file = e.target.files[0];
    dispatch(setFormUser("image", file));
    dispatch(setImgPreview(URL.createObjectURL(file)));
  };
  //update to use API
  const onSubmit = () => {
    if (email === "" || telp === "") {
      swal("Data Harus di isi", { icon: "warning" });
    } else {
      updateUserToAPI(formUser, dataUserById._id,setsukses);
      history.goForward();
    }
  };

  return (
    <Fragment>
      <div className="flex flex-col justify-center">
        <div className="flex w-full justify-center  items-center">
          <h1 className="font-crimson font-bold text-gray-700 text-center">
            Edit Profil
          </h1>
        </div>
        <div className="flex flex-col md:flex-row justify-center bg-white shadow rounded-sm p-5 mt-5">
          <div className="flex flex-col">
            <img className="w-32 h-32 bg-gray-200" src={imgPreview} alt="" />
            <input
              onChange={(e) => onImageUpload(e)}
              type="file"
              className="w-32 text-xs mt-1"
            />
          </div>

          <div className="flex flex-col ml-2 w-44">
            <div className="flex flex-col border-b py-1 border-gray-500">
              <p className=" uppercase font-semibold text-sm truncate">
                {dataUserById.nama}
              </p>
              <p className="text-xs font-light">{dataUserById.noId}</p>
              <p className="text-xs font-light">{dataUserById.tipe}</p>
            </div>
            <div className="flex flex-col border-b py-1 border-gray-500">
              <InputProfil
                value={email}
                onChange={(e) => dispatch(setFormUser("email", e.target.value))}
                type="text"
                label="Email"
              />
              <InputProfil
                value={telp}
                onChange={(e) => dispatch(setFormUser("telp", e.target.value))}
                type="text"
                label="No Handphone"
              />
            </div>
            <div className="flex flex-col py-1">
              <InputProfil
                value={password}
                onChange={(e) =>
                  dispatch(setFormUser("password", e.target.value))
                }
                type="password"
                label="Password"
              />
            </div>
            <div className="flex flex-row justify-between py-1">
              <Btn
                onClick={onSubmit}
                color="bg-blue-600 hover:bg-blue-500 w-20"
                label="Simpan"
              />
              <Btn
                onClick={() => history.goBack()}
                color="bg-gray-400 hover:bg-gray-300 w-20"
                label="Batal"
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default InputDataProfil;
