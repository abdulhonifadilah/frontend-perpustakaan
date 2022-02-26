import axios from "../helpers/axios";
import swal from "sweetalert";

//get semua buku
export const setDataBuku = () => {
  return async (dispatch) => {
    await axios
      .get("/buku/get")
      .then( (result) => {
        const resBuku = result.data;
        dispatch({
          type: 'AMBIL_SEMUA_BUKU_SUKSES',
          payload: resBuku.data,
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

export const setDataBukuByid=(id)=>{
  return async(dispatch)=>{
    await axios.get(`/buku/get/${id}`).then((result) => {
        const resBuku = result.data.data;
        dispatch({
          type: "GET_BY_ID",
          payload:resBuku,
        })
      }).catch((err) => {
        console.log("error", err);
      });
  }
}

//tambah buku
export const setFormBuku = (formType, formValue ) => {
  return { type: 'TAMBAH_BUKU_SUKSES', formType, formValue  };
};
//set image preview
export const setImgPreview = (payload) => {
  return { type: "SET_IMG_PREVIEW", payload };
};


//post buku
export const postToAPI = async (form, setsukses) => {
  const data = new FormData();
  data.append("judul", form.judul);
  data.append("image", form.image);
  data.append("pengarang", form.pengarang);
  data.append("kategori", form.kategori);
  data.append("tahun", form.tahun);
  data.append("jumlah_halaman", form.jumlah_halaman);
  data.append("jumlah_buku", form.jumlah_buku);
  data.append("deskripsi", form.deskripsi);
  await axios
    .post("/buku/post", data, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then(async (res) => {
      await swal("sukses",{icon: "success",
        buttons: false,
        timer: 1000,
      });
      setsukses(true);
    })
    .catch((err) => {
      console.log("error : ", err);
    });
};


//post update
export const updateToAPI=(form, id, setsukses)=>{
  const data = new FormData();
  data.append("judul", form.judul);
  data.append("image", form.image);
  data.append("pengarang", form.pengarang);
  data.append("kategori", form.kategori);
  data.append("tahun", form.tahun);
  data.append("jumlah_halaman", form.jumlah_halaman);
  data.append("jumlah_buku", form.jumlah_buku);
  data.append("deskripsi", form.deskripsi);

  axios
    .put(`/buku/update/${id}`, data, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then(async(res) => {
      const message= res.data.message
      await swal(message,{icon: "success",
        buttons: false,
        timer: 1000,
      })
      setsukses(true);
      })
    .catch((err) => {
      console.log("error : ", err);
    });
}

//hapus data
export const deleteBuku= (id)=>{
  axios.delete(`/buku/delete/${id}`)
  .then(()=>{
    swal("buku berhasil dihapus",{icon: "success",
        buttons: false,
        timer: 1000,
      });
      window.history.back();
  })
  .catch((err)=>{
    console.log(err)
  })
}
