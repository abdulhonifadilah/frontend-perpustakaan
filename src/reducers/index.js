import authReducer from './auth.reducers';
import bukuReducer from './buku.reducer';
import userReducer from './user.reducer';
import peminjamanReducers from './peminjaman.reducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    buku: bukuReducer,
    user: userReducer,
    peminjaman: peminjamanReducers,
});

export default rootReducer;