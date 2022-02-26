let initialState = {
  dataPeminjaman: [],
  dataPeminjamanById:{},
  form: {
    idBuku: "",
    judul: "",
    idAnggota: "",
    anggota: "",
    tanggal_pinjam: "",
    batas_kembali: "",
    tanggal_kembali: "",
    status: "",
    admin: "",
    foto:""
  },
  show:false
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_PEMINJAMAN":
      state = {
        ...state,
        dataPeminjaman: action.payload,
        show: true
      };
      break;
      case "GET_BY_ID":
        state = {
          ...state,
          dataPeminjamanById : action.payload,
          show:true
        }
        break;
    case "TAMBAH_PEMINJAMAN":
      state = {
        ...state,
        form: {
          ...state.form,
          [action.formType]: action.formValue,
        },
      };
      break;
    default:
      break;
  }
  return state;
};
