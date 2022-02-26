import React, { Fragment, useEffect, useState } from "react";
import InputData from "../../../atoms/input/inputData";
import Btn from "../../../atoms/btn";
import ListBox from "../../listbox";
import Upload from "../../../atoms/upload";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFormUser } from "../../../../actions";
import {
  postUserToAPI,
  setDataUserById,
  setImgPreview,
  updateUserToAPI,
} from "../../../../actions/user.action";
import swal from "sweetalert";

//array lisbox
const listRole = ["admin", "user"];
const listTipe = ["mahasiswa", "dosen", "staff"];

function InputDataUser({ label, id, ...rest }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { imgPreview, dataUserById, formUser} = useSelector(
    (state) => state.user
  );
  const { noId, nama, email, telp, password } = formUser;
  const [tipe, settipe] = useState("-");
  const [role, setrole] = useState("-");
  const [sukses, setsukses] = useState(false)
  useEffect(() => {
    dispatch(setFormUser("image", ""));
    if (id) {
      dispatch(setDataUserById(id));
      dispatch(setFormUser("noId", dataUserById.nim_nidn_niy));
      dispatch(setFormUser("nama", dataUserById.nama));
      dispatch(setFormUser("email", dataUserById.email));
      dispatch(setFormUser("telp", dataUserById.telp));
      dispatch(setFormUser("password", ""));
      settipe(dataUserById.tipe);
      setrole(dataUserById.role);
      dispatch(setImgPreview(`http://localhost:4000/${dataUserById.foto}`));
      if(sukses){
        history.goBack();
      }
    }else{
      dispatch(setFormUser("noId", ""));
      dispatch(setFormUser("nama", ""));
      dispatch(setFormUser("email", ""));
      dispatch(setFormUser("telp", ""));
      dispatch(setFormUser("password", ""));
      dispatch(setImgPreview(``));
      if(sukses){
        history.replace();
      }
    }
  }, [dataUserById.email, dataUserById.foto, dataUserById.nama, dataUserById.nim_nidn_niy, dataUserById.role, dataUserById.telp, dataUserById.tipe, dispatch, history, id, sukses]);

  const onImageUpload = (e) => {
    const file = e.target.files[0];
    dispatch(setFormUser("image", file));
    dispatch(setImgPreview(URL.createObjectURL(file)));
  };

  const onSubmit = () => {
    formUser.tipe=tipe;
    formUser.role=role;
    if (nama === ""||noId===""||role==="-"||tipe==="-") {
      swal("Data Harus di isi", { icon: "warning" });
    } else {
      if (id) {
        updateUserToAPI(formUser, id,setsukses);
      } else {
        if(password===""){
          swal("Data Harus di isi", { icon: "warning" });
        }else{
        postUserToAPI(formUser,setsukses);
        // history.replace();
        }
      }
    }
  };

  return (
    <Fragment>
      <div className={` block my-3`}>
        <div className={`block my-3`}>
          <h1 className="font-crimson font-bold text-gray-700 text-center capitalize">
            {label}
          </h1>
        </div>
        <div className="p-3 flex flex-col md:flex-row justify-center items-center md:items-start">
          <Upload img={imgPreview} onChange={(e) => onImageUpload(e)} />
          <div className="flex flex-col md:mx-2 items-start  justify-start">
            <InputData
              type="text"
              value={noId}
              onChange={(e) => dispatch(setFormUser("noId", e.target.value))}
              judul="NIM/NIY/NIDN"
            />
            <InputData
              type="text"
              value={nama}
              onChange={(e) => dispatch(setFormUser("nama", e.target.value))}
              judul="Nama"
            />
            <InputData
              type="text"
              value={email}
              onChange={(e) => dispatch(setFormUser("email", e.target.value))}
              judul="Email"
            />
            <InputData
              type="text"
              value={telp}
              onChange={(e) => dispatch(setFormUser("telp", e.target.value))}
              judul="No Handphone"
            />
            <div className="flex justify-end w-full my-0.5 items-center z-10">
              <h1 className="font-montserrat mx-1 text-xs">Tipe :</h1>
              <ListBox
                selected={tipe}
                setSelected={settipe}
                isValue={listTipe}
              />
            </div>
            <div className="flex justify-end w-full my-0.5 items-center">
              <h1 className="font-montserrat mx-1 text-xs">Role :</h1>
              <ListBox
                selected={role}
                setSelected={setrole}
                isValue={listRole}
              />
            </div>
            <InputData
              value={password}
              onChange={(e) =>
                dispatch(setFormUser("password", e.target.value))
              }
              judul="Password"
            />
          </div>
        </div>
        <div className="flex flex-row w-full justify-end mb-3">
          <Btn
            onClick={onSubmit}
            label="Simpan"
            color="bg-blue-500 hover:bg-blue-400 mx-5 w-24"
          />
          <Btn
            onClick={() => history.goBack()}
            label="Batal"
            color="bg-gray-500 hover:bg-gray-400 mx-5 w-24"
          />
        </div>
      </div>
    </Fragment>
  );
}

export default InputDataUser;
