import axios from "../helpers/axios";


export const login = (user) => {
    return async (dispatch) => {
        dispatch({ type: "LOGIN_REQUEST" });
        const res = await axios.post(`/auth/signin`, {
            ...user
        });
        if(res.status === 200){
            const { token, user } = res.data;
            localStorage.setItem('role', user.role)
            localStorage.setItem('user', JSON.stringify(user));
            sessionStorage.setItem('token',token);
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: {
                    token,user
                }
            });
        }else{
            if(res.status === 400){
                dispatch({
                    type: "LOGIN_FAILURE",
                    payload: { error: res.data.error }
                });
            }
        }
    }
}

export const isUserLoggedIn = () => {
    return async dispatch => {
        const token =sessionStorage.getItem('token');
        if(token){
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: {
                    token, user
                }
            });
        }else{
            dispatch({
                type: "LOGIN_FAILURE",
                payload: { error: 'Failed to login' }
            });
        }
    }
}

export const signout = () => {
    return async dispatch => {
        dispatch({ type: "LOGOUT_REQUEST" });
        const res = await axios.post(`/auth/signout`);
        if(res.status === 200){
            localStorage.clear();
            sessionStorage.clear();
            dispatch({ type: "LOGOUT_SUCCESS" });
        }else{
            dispatch({
                type: "LOGOUT_FAILURE",
                payload: { error: res.data.error }
            });
        }

        
    }
}