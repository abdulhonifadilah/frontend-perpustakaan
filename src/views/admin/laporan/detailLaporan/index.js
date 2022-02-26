import React, {  useEffect, useState } from "react";
import Btn from "../../../../components/atoms/btn";
import { useHistory, withRouter } from "react-router-dom";
import AdminLayout from "../../../../components/molecule/layout/admin";
import DataDetailLaporan from "../../../../components/molecule/detail/detailLaporan";
import { useDispatch, useSelector } from "react-redux";
import {  setPeminjamanById } from "../../../../actions";
import { LoadingText } from "../../../../components/atoms/icons";
function DetailLaporan(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const {dataPeminjamanById}=useSelector((state)=>state.peminjaman)
  const [show, setshow] = useState(false);
  const [buku, setbuku] = useState({});
  const [anggota, setanggota] = useState({})
  useEffect(() => {
      const id = props.match.params.id;
    dispatch(setPeminjamanById(id));
    if(!dataPeminjamanById.anggota){
      setshow(false);
      console.log("false");
    }else{
      setshow(true);
      setbuku(dataPeminjamanById.buku);
      setanggota(dataPeminjamanById.anggota)
    }
    
  }, [dataPeminjamanById.anggota, dataPeminjamanById.buku, dispatch, props.match.params.id, show]);
  
  return (
    <AdminLayout>
      <div className="container flex flex-col justify-center items-center mt-5">
        {show&&(
          <div
          className={`flex flex-col justify-center items-center p-2 rounded shadow-md bg-white`}
        >
        <DataDetailLaporan
          img={`http://localhost:4000/${dataPeminjamanById.foto}`}
          judul={buku.judul}
          peminjam={anggota.anggota}
          tanggalPinjam={dataPeminjamanById.tanggal_pinjam}
          batasPinjam={dataPeminjamanById.batas_kembali}
          tanggalKembali={dataPeminjamanById.tanggal_kembali}
          status={dataPeminjamanById.status}
          admin={dataPeminjamanById.admin}
        />
      
          <div className="w-full mb-4 flex justify-end mt-3 md:mt-0">
            <div className="mx-4">
              <Btn
                onClick={() => history.goBack()}
                label="Kembali"
                color="bg-gray-400 hover:bg-gray-300 w-20"
              />
            </div>
          </div>
        </div>
        )}
        {!show &&(<div className="flex w-full mt-16 justify-center"> <LoadingText/></div>)}
      </div>
    </AdminLayout>
  );
}

export default withRouter(DetailLaporan);
