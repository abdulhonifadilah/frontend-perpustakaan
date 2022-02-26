import React, { Fragment, useEffect, useState } from "react";
import InputData from "../../../atoms/input/inputData";
import TextArea from "../../../atoms/input/textArea";
import Btn from "../../../atoms/btn";
import Upload from "../../../atoms/upload";
import { useSelector, useDispatch } from "react-redux";
import swal from "sweetalert";
import { postToAPI, setDataBukuByid, setFormBuku, setImgPreview, updateToAPI, } from "../../../../actions";
import { useHistory } from "react-router-dom";

function InputDataBuku({ label, id, ...rest }) {
  const history = useHistory();
  const { formBuku, imgPreview,dataBukuById } = useSelector((state) => state.buku);
  const { judul, pengarang, kategori, tahun, jumlah_halaman, jumlah_buku, deskripsi, } = formBuku;
  const dispatch = useDispatch();
  const [sukses, setsukses] = useState(false)
  useEffect(() => {
    dispatch(setFormBuku("image", ""));
    if (id) {
      dispatch(setDataBukuByid(id));
      dispatch(setFormBuku("judul", dataBukuById.judul));
      dispatch(setImgPreview(`http://localhost:4000/${dataBukuById.foto}`));
      dispatch(setFormBuku("pengarang", dataBukuById.pengarang));
      dispatch(setFormBuku("kategori", dataBukuById.kategori));
      dispatch(setFormBuku("tahun", dataBukuById.tahun));
      dispatch(setFormBuku("jumlah_halaman", dataBukuById.jumlah_halaman));
      dispatch(setFormBuku("jumlah_buku", dataBukuById.jumlah_buku));
      dispatch(setFormBuku("deskripsi", dataBukuById.deskripsi));
      if(sukses){
        history.goBack()
      }
    }else{
      dispatch(setFormBuku("judul", ""));
      dispatch(setImgPreview(``));
      dispatch(setFormBuku("pengarang", ""));
      dispatch(setFormBuku("kategori", ""));
      dispatch(setFormBuku("tahun", ""));
      dispatch(setFormBuku("jumlah_halaman", ""));
      dispatch(setFormBuku("jumlah_buku", ""));
      dispatch(setFormBuku("deskripsi", ""));
      if(sukses){
        history.replace()
      }
    }
  }, [dataBukuById.deskripsi, dataBukuById.foto, dataBukuById.judul, dataBukuById.jumlah_buku, dataBukuById.jumlah_halaman, dataBukuById.kategori, dataBukuById.pengarang, dataBukuById.tahun, dispatch, history, id, sukses]);
  
  const onSubmit =() => {
    if ( judul === "" || pengarang === "" || kategori === "" || tahun === "" || jumlah_halaman === "" || jumlah_buku === "" || deskripsi === "" ) {
      swal("Data Harus di isi", { icon: "warning" });
    }else{
      if(id){
        updateToAPI(formBuku, id, setsukses);
      }else{
        postToAPI(formBuku,setsukses);
      }
    }
  };
  const onImageUpload = (e) => {
    const file = e.target.files[0];
    dispatch(setFormBuku("image", file));
    dispatch(setImgPreview(URL.createObjectURL(file)));
  };
  return (
    <Fragment>
      <div className=" my-3">
        <h1 className="font-crimson font-bold text-gray-700 text-center">
          {label}
        </h1>
      </div>
      <div className="p-3 flex flex-col md:flex-row justify-center items-center md:items-start">
        <div className="flex flex-col">
          <Upload img={imgPreview} onChange={(e) => onImageUpload(e)} />
        </div>
        <div className="md:mx-2 flex flex-col items-end">
          <InputData
            value={judul}
            onChange={(e) => dispatch(setFormBuku("judul", e.target.value))}
            judul="Judul"
          />
          <InputData
            value={pengarang}
            onChange={(e) => dispatch(setFormBuku("pengarang", e.target.value))}
            judul="Pengarang"
          />
          <InputData
            value={kategori}
            onChange={(e) => dispatch(setFormBuku("kategori", e.target.value))}
            judul="Kategori"
          />
          <InputData
            min="0"
            type="number"
            value={tahun}
            onChange={(e) => dispatch(setFormBuku("tahun", e.target.value))}
            judul="Tahun"
          />
          <InputData
            min="0"
            type="number"
            value={jumlah_halaman}
            onChange={(e) =>
              dispatch(setFormBuku("jumlah_halaman", e.target.value))
            }
            judul="Jumlah Halaman"
          />
          <InputData
            min="0"
            type="number"
            value={jumlah_buku}
            onChange={(e) =>
              dispatch(setFormBuku("jumlah_buku", e.target.value))
            }
            judul="Jumlah Buku"
          />
          <TextArea
            value={deskripsi}
            onChange={(e) => dispatch(setFormBuku("deskripsi", e.target.value))}
            judul="Deskripsi"
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
    </Fragment>
  );
}

export default InputDataBuku;
