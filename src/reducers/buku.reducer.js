const initialState = {
  dataBuku: [],
  dataBukuById:{},
  formBuku: {
    judul: "",
    image: "",
    pengarang: "",
    kategori: "",
    tahun: "",
    jumlah_halaman: "",
    jumlah_buku: "",
    deskripsi: "",
  },
  imgPreview: null,
  show: false
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action)=>{
  switch (action.type) {
    case "AMBIL_SEMUA_BUKU_SUKSES":
      state = {
        ...state,
        dataBuku: action.payload,
        show:true
      };
      break;
    case "TAMBAH_BUKU_SUKSES":
      state = {
        ...state,
        formBuku: {
          ...state.formBuku,
          [action.formType]: action.formValue,
        },
      };
      break;
      case "GET_BY_ID":
        state={
          ...state,
          dataBukuById:action.payload,
          show:true
        }
        break;
    case "SET_IMG_PREVIEW":
      state = {
        ...state,
        imgPreview: action.payload,
      };
      break;
      default:
      break;
  }
  return state;
};
