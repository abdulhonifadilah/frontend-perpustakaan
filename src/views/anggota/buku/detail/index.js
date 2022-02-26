import React, {  useEffect } from "react";
import { BukuDetail } from "../../../../components/molecule/detail";
import Btn from "../../../../components/atoms/btn";
import { withRouter, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserLayout from "../../../../components/molecule/layout/user";
import { postPeminjamanToAPI, setDataBukuByid } from "../../../../actions";
import swal from "sweetalert";
import { LoadingText } from "../../../../components/atoms/icons";


function DetailBukuAnggota(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  //set user
  const user = JSON.parse(window.localStorage.getItem("user"));
  //set pinjam buku
  const { form } = useSelector((state) => state.peminjaman);
  const {dataBukuById,show}=useSelector((state)=>state.buku)
  useEffect(() => {
    const id = props.match.params.id;
    dispatch(setDataBukuByid(id));
  }, [dispatch, props.match.params.id]);
  //peminjaman
  form.idBuku = dataBukuById._id;
  form.judul = dataBukuById.judul;
  form.idAnggota = user._id;
  form.anggota = user.nama;
  form.tanggal_kembali = "-";
  form.status = "dipinjam";
  form.admin = "-";
  form.foto= dataBukuById.foto;
  //set function pinjam
  const setPinjam = (id) => {
    swal("Apa anda yakin akan meminjam buku ini", {
      buttons: {
        cancel:"Batal",
        confirm: {
          text: "Pinjam",
          value: "pinjam",
        },
      },
    }).then(async(value) => {
      if (value === "pinjam") {
        await postPeminjamanToAPI(form);
        history.replace();
      }
    });
  };
  const setBt = (jmlBuku) => {
    if (jmlBuku === 0) {
      return (
        <Btn
          onClick={() => history.goBack()}
          label="Kembali"
          color="w-24 bg-gray-400 hover:bg-gray-300"
        />
      );
    } else {
      return (
        <Btn
          onClick={setPinjam}
          label="Pinjam"
          color="w-24 bg-green-500 hover:bg-green-400"
        />
      );
    }
  };

  return (
    <UserLayout>
      <div className="container flex flex-col justify-center items-center mt-10">
        <>{show &&(
          <div className="flex flex-col justify-center items-center p-2 rounded-md shadow-md bg-white">
          <BukuDetail
            img={`http://localhost:4000/${dataBukuById.foto}`}
            judul={dataBukuById.judul}
            pengarang={dataBukuById.pengarang}
            kategori={dataBukuById.kategori}
            tahun={dataBukuById.tahun}
            halaman={dataBukuById.jumlah_halaman}
            buku={dataBukuById.jumlah_buku}
            deskripsi={dataBukuById.deskripsi}
          />
          <div className="w-full mb-4 flex justify-center md:justify-end px-8">
            {setBt(dataBukuById.jumlah_buku)}
          </div>
        </div>
        )}</>
        {!show&&(<LoadingText/>)}
      </div>
    </UserLayout>
  );
}

export default withRouter(DetailBukuAnggota);
