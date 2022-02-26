import React, { useEffect } from "react";
import Btn from "../../../../components/atoms/btn";
import { useHistory } from "react-router-dom";
import { DetailUser as DataDetailUser } from "../../../../components/molecule/detail";
import { withRouter } from "react-router-dom";
import AdminLayout from "../../../../components/molecule/layout/admin";
import { useDispatch, useSelector } from "react-redux";
import { setDataUserById } from "../../../../actions";
import { LoadingText } from "../../../../components/atoms/icons";

function DetailUser(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { dataUserById,show } = useSelector((state) => state.user);
  useEffect(() => {
    const id = props.match.params.id;
    dispatch(setDataUserById(id));
  }, [dispatch, props.match.params.id]);
  
  return (
    <AdminLayout>
      <div className="container flex flex-col justify-center items-center mt-5">
        <>{show &&(
            <div className={`${show?'block':'hidden'}block`}>
          <div className="flex flex-col justify-center items-center p-2 rounded shadow-md bg-white">
            
          <DataDetailUser
              img={`http://localhost:4000/${dataUserById.foto}`}
              noId={dataUserById.nim_nidn_niy}
              nama={dataUserById.nama}
              email={dataUserById.email}
              telp={dataUserById.telp}
              role={dataUserById.role}
              tipe={dataUserById.tipe}
            />
            <div className="w-full mb-4 flex justify-end mx-4 mt-3 md:mt-0">
              <Btn
                onClick={() => history.push(`/admin/user/edit/${dataUserById._id}`)}
                label="Edit"
                color="bg-green-500 hover:bg-green-400 w-20 mx-5"
              />
              <Btn
                onClick={() => history.goBack()}
                label="Kembali"
                color="bg-gray-400 hover:bg-gray-300 w-20 mx-5"
              />
            </div>
          </div>
        </div>
          )
        }
        {!show &&(
        <LoadingText/>
        )}
        </>
        
      </div>
    </AdminLayout>
  );
}

export default withRouter(DetailUser);
