import React, { useEffect } from "react";
import Btn from "../../../../components/atoms/btn";
import { useHistory, withRouter } from "react-router-dom";
import swal from "sweetalert";
import AdminLayout from "../../../../components/molecule/layout/admin";
import { BukuDetail } from "../../../../components/molecule/detail";
import { deleteBuku, setDataBukuByid, setDataPeminjaman } from "../../../../actions";
import { useDispatch, useSelector } from "react-redux";
import { LoadingText } from "../../../../components/atoms/icons";

function DetailBuku(props) {
  const history = useHistory();
  const { dataBukuById,show } = useSelector((state) => state.buku);
  const {dataPeminjaman}=useSelector((state)=>state.peminjaman);
  const dispatch = useDispatch();
  useEffect(() => {
    const id = props.match.params.id;
    dispatch(setDataBukuByid(id));
    dispatch(setDataPeminjaman());
    }, [dispatch, props.match.params.id]);
  const onDelete =async(id) => {
    let nilai="";
    for(let i = 0; i < dataPeminjaman.length; i++) {
            if(dataPeminjaman[i].buku.idBuku===id ){
               if( dataPeminjaman[i].status==="dikembalikan" || dataPeminjaman[i].status ==="dipinjam" ){
              nilai="ada";
              break
            }
          }
          }
    if(nilai==="ada"){
      swal("buku masih di pinjam", {
        icon: "warning",
        buttons: false,
        timer: 1000,
      });
    }else{
      swal("Apa anda yakin akan menghapus Buku ini", {
      dangerMode: true,
      buttons: {
        cancel: "Batal",
        confirm: {
          text: "Hapus",
          value: "hapus",
        },
      },
    }).then((value) => {
      if (value === "hapus") {
        deleteBuku(id);
      }
    });
    }
  };

  return (
    <AdminLayout>
     <>{show &&(
       <div className="container flex flex-col justify-center items-center mt-5">
        <div
          className={`flex flex-col justify-center items-center p-2 rounded shadow-md bg-white`}
        >
          <BukuDetail
            img={`http://localhost:4000/${dataBukuById.foto}`}
            judul={dataBukuById.judul}
            pengarang={dataBukuById.pengarang}
            kategori={dataBukuById.kategori}
            tahun={dataBukuById.tahun}
            halaman={dataBukuById.jumlah_halaman}
            buku={dataBukuById.jumlah_buku}
            deskripsi={dataBukuById.deskripsi}
          />
          <div className="w-full mb-4 flex justify-end mx-4 mt-3 md:mt-0">
            <Btn
              onClick={() => history.push(`/admin/buku/edit/${dataBukuById._id}`)}
              label="Edit"
              color="bg-green-500 hover:bg-green-400 w-20 mx-5"
            />
            <Btn
              onClick={() => onDelete(props.match.params.id)}
              label="Hapus"
              color="bg-red-500 hover:bg-red-400 w-20 mx-5"
            />
          </div>
        </div>
      </div>
     )}</>
     {!show &&(<div className="flex w-full mt-16 justify-center"> <LoadingText/></div>)}
     
    </AdminLayout>
  );
}

export default withRouter(DetailBuku);
