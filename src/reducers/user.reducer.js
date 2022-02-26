const initialState = {
  dataUser: [],
  dataUserById: {},
  formUser: {
    noId: "",
    image: "",
    nama: "",
    email: "",
    telp: "",
    role: "",
    tipe: "",
    password: "",
  },
  imgPreview: "",
  show: false,
  sukses:false,
  message:""

};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_USERS":
      state = {
        ...state,
        dataUser: action.payload,
        show:true
      };
      break;
    case "GET_USER_BY_ID":
      state = {
        ...state,
        dataUserById: action.payload,
        show: true
      };
      break;
      case "POST_SUKSES":
      state = {
        ...state,
        sukses: true
      };
      break;
    case "FORM_USER":
      state = {
        ...state,
        formUser: {
          ...state.formUser,
          [action.formType]: action.formValue,
        },
      };
      break;
    case "SET_IMG_PREVIEW":
      state = {
        ...state,
        imgPreview : action.payload,
      };
      break;
    default:
      break;
  }

  return state;
};
