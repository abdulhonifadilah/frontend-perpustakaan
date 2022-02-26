import axios from "../helpers/axios";
import swal from "sweetalert";

//get data user
export const setDataUser = () => {
  return async (dispatch) => {
    const res=await axios.get("/user/get");
    if(res.status===200){
      dispatch({
              type: "GET_ALL_USERS",
              payload: res.data.data,
            });
    }else{
      console.log("something error");
    }
  };
};
export const setDataUserById = (id) => {
  return async (dispatch) => {
    await axios
      .get(`/user/get/${id}`)
      .then((res) => {
        const resData = res.data.data;
        dispatch({
          type: "GET_USER_BY_ID",
          payload: resData,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//tambah User
export const setFormUser = (formType, formValue) => {
  return { type: "FORM_USER", formType, formValue };
};
//set Img preview
export const setImgPreview = (payload) => {
  return { type: "SET_IMG_PREVIEW", payload };
};

//post user / tambah user
export const postUserToAPI = async(formUser,setsukses) => {
    const data = new FormData();
    data.append("nama", formUser.nama);
    data.append("noId", formUser.noId);
    data.append("email", formUser.email);
    data.append("telp", formUser.telp);
    data.append("image", formUser.image);
    data.append("role", formUser.role);
    data.append("tipe", formUser.tipe);
    data.append("password", formUser.password);
    await axios
      .post("/user/post", data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(async(res) => {
        await swal("Tambah User Berhasil", {
          icon: "success",
          buttons: false,
          timer: 1000,
        });
        setsukses(true);
      })
      .catch(() => {
        setsukses(false)
      });
};

//post update
export const updateUserToAPI =async (formUser, id,setsukses) => {
    const data = new FormData();
    data.append("nama", formUser.nama);
    data.append("noId", formUser.noId);
    data.append("email", formUser.email);
    data.append("telp", formUser.telp);
    data.append("image", formUser.image);
    data.append("role", formUser.role);
    data.append("tipe", formUser.tipe);
    data.append("password", formUser.password);
    await axios
      .put(`/user/update/${id}`, data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(async(res) => {
        await swal("Update Berhasil", {
          icon: "success",
          buttons: false,
          timer: 1000,
        });
        setsukses(true);
      })
      .catch(() => {
        setsukses(false)
      });
};

export const deleteUser = (id) => {
  axios
    .delete(`/user/delete/${id}`)
    .then(() => {
      swal("User Berhasi dihapus", {
        icon: "success",
        buttons: false,
        timer: 1000,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
