import axios from 'axios';
import { api } from '../urlConfig';
import store from '../store';
import swal from 'sweetalert';

const token = window.localStorage.getItem('token');

const axiosIntance = axios.create({
    baseURL: api,
    headers: {
        'Authorization': token ? `Bearer ${token}` : ''
    }
});

axiosIntance.interceptors.request.use((req) => {
    const { auth } = store.getState();
    if(auth.token){
        req.headers.Authorization = `Bearer ${auth.token}`;
    }
    return req;
})


axiosIntance.interceptors.response.use((res) => {
    return res;
}, (error) => {
    swal(error.response.data.message,{icon: "warning",
        buttons: false,
        timer: 1500,
      });
    localStorage.setItem('message', error.response.data.message);
    const status = error.response ? error.response.status : 500;
    if(status && status === 500){
        // localStorage.clear();
        // sessionStorage.clear();
        // store.dispatch({ type: "LOGOUT_SUCCESS" });
        swal({title:"500",icon: "error",
        buttons: false,
        timer: 1500,
      });
    }
    return Promise.reject(error);
})

export default axiosIntance;