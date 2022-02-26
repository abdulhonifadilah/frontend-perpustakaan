import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./views/login";
import UserRoute from "./components/HOC/UserRoute";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./actions";
//admin
import AdminRoute from "./components/HOC/AdminRoute";
import Dasboard from "./views/admin/dasboard";
import { DetailProfil, EditProfil } from "./views/admin/profil";
import {
  DaftarBuku,
  BukuDetail,
  TambahBuku,
  EditBuku,
} from "./views/admin/buku";
import {
  DaftarUser,
  DetailUser,
  EditUser,
  TambahUser,
} from "./views/admin/user";
import { DaftarLaporan, DetailLaporan } from "./views/admin/laporan";

//user
import DetailBukuAnggota from "./views/anggota/buku/detail";
import Buku from "./views/anggota/buku/daftar";
import History from "./views/anggota/history";
import Homepage from "./views/anggota/homepage";
import { ProfilAnggota,EditProfilPage } from "./views/anggota/profil";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  //componentDidMount or componentDidUpdate
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate, dispatch]);

  return (
    <div className="min-h-screen bg-gray-200">
      <Switch>
        {/* admin */}
        <AdminRoute path="/admin" exact component={Dasboard} />
        <AdminRoute path="/admin/profil" exact component={DetailProfil} />
        <AdminRoute path="/admin/profil/edit" exact component={EditProfil} />
        <AdminRoute path="/admin/buku" exact component={DaftarBuku} />
        <AdminRoute path="/admin/buku/detail/:id?" exact component={BukuDetail} />
        <AdminRoute path="/admin/buku/tambah" exact component={TambahBuku} />
        <AdminRoute path="/admin/buku/edit/:id?" exact component={EditBuku} />
        <AdminRoute path="/admin/user" exact component={DaftarUser} />
        <AdminRoute path="/admin/user/detail/:id?" exact component={DetailUser} />
        <AdminRoute path="/admin/user/edit/:id?" exact component={EditUser} />
        <AdminRoute path="/admin/user/tambah" exact component={TambahUser} />
        <AdminRoute path="/admin/laporan" exact component={DaftarLaporan} />
        <AdminRoute path="/admin/laporan/detail/:id?" exact component={DetailLaporan} />

        {/* user */}
        <UserRoute path="/" exact component={Homepage} />
        <UserRoute path="/history" exact component={History} />
        <UserRoute path="/buku" exact component={Buku} />
        <UserRoute path="/buku/detail/:id?" exact component={DetailBukuAnggota} />
        <UserRoute path="/profil" exact component={ProfilAnggota} />
        <UserRoute path="/profil/edit" exact component={EditProfilPage} />
        <Route path="/signin">
          <LoginPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
