const initState = {
    token: null,
    user: {
        nama : '',
        noId :'',
        email : '',
        telp : '',
        role : '',
        tipe : ''
    },
    authenticate: false,
    authenticating: false,
    loading: false,
    error: null,
    message: ''
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action)=>{
    switch (action.type) {
        case "LOGIN_REQUEST":
            state = {
                ...state,
                authenticating: true
            }
            break;
        case "LOGIN_SUCCESS":
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticate: true,
                authenticating: false
            }
            break;
        case "LOGOUT_REQUEST":
            state = {
                ...state,
                loading: true
            }
            break;
        case "LOGOUT_SUCCESS":
            state = {
                ...initState
            }
            break;
        case "LOGOUT_FAILURE":
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
            case "LOGIN_FAILURE":
            state = {
                ...state,
                error: action.payload.error,
                message: 'error'
            }
            break;
            default:
            break;
    }
    return state;
}