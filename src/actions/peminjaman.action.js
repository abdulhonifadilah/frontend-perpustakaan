import swal from "sweetalert";
import axios from "../helpers/axios";
import moment from "moment";
import("moment/locale/id");
import("moment/min/locales.min");
moment.updateLocale("id", {
  months: [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Augustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ],
});
const m = moment().locale("id");
const tglSekarang = m.format("Do MMMM YYYY");
const mNew = m.add(7, "days");
const batasPinjam = mNew.format("Do MMMM YYYY");

//get semua peminjaman
export const setDataPeminjaman = () => {
  return async (dispatch) => {
    await axios
      .get("/peminjaman/get")
      .then((result) => {
        const resPeminjaman = result.data;
        dispatch({
          type: "GET_ALL_PEMINJAMAN",
          payload: resPeminjaman.data,
        });
      })
      .catch((err) => {
        console.log("err ", err);
      });
  };
};

//get semua peminjamna oleh user
export const setDataPeminjamanUser = (id, nama) => {
  return async (dispatch) => {
    const data = new FormData();
    data.append("idAnggota", id);
    data.append("anggota", nama);
    await axios
      .post("/peminjaman/getByUserId", data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((result) => {
        const resPeminjaman = result.data.data;
        dispatch({
          type: "GET_ALL_PEMINJAMAN",
          payload: resPeminjaman,
        });
      })
      .catch((err) => {
        console.log("err ", err);
      });
  };
};

//set peminjaman by id
export const setPeminjamanById = (id) => {
  return async (dispatch) => {
  await axios
    .get(`/peminjaman/get/${id}`)
    .then((res) => {
      const resData = res.data.data;
      dispatch({
        type: "GET_BY_ID",
        payload: resData,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }
};

export const setFormPeminjaman = (formType, formValue) => {
  return { type: "TAMBAH_PEMINJAMAN", formType, formValue };
};

const setAksi = async (id, tipe) => {
  const data = new FormData();
  data.append("tipe", tipe);
  await axios
    .put(`/buku/update/${id}`, data, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then()
    .catch((err) => console.log(err));
};

export const postPeminjamanToAPI = async (form) => {
  const data = new FormData();
  data.append("idBuku", form.idBuku);
  data.append("judul", form.judul);
  data.append("idAnggota", form.idAnggota);
  data.append("anggota", form.anggota);
  data.append("tanggal_pinjam", tglSekarang);
  data.append("batas_kembali", batasPinjam);
  data.append("tanggal_kembali", form.tanggal_kembali);
  data.append("status", form.status);
  data.append("admin", form.admin);
  data.append("foto", form.foto);

  await axios
    .post("/peminjaman/post", data, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then(setAksi(form.idBuku, "dipinjam"))
    .catch((err) => {
      console.log("error :", err);
    });
};

export const updatePeminjaman = async (id, idBuku, tipe, admin) => {
  const data = new FormData();
  data.append("tanggal_kembali", tglSekarang);
  data.append("admin", admin);
  data.append("tipe", tipe);
  await axios
    .put(`/peminjaman/update/${id}`, data, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then(async () => {
      await swal(`buku berhasil ${tipe}`, {
        icon: "success",
        buttons: false,
        timer: 1000,
      });
      if (tipe === "terkonfirmasi") {
        setAksi(idBuku, tipe);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deletPeminjaman=(id)=>{
  axios.delete(`/peminjaman/delete/${id}`)
  .then(()=>{
    swal("Laporan Berhasi dihapus", {
      icon: "success",
      buttons: false,
      timer: 1000,
    });
  })
  .catch((err)=>{
    console.log("err ", err);
  })
}

