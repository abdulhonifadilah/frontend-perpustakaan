import React, { Fragment, useState } from "react";
import Logo from "../../assets/images/logoLogin.svg";
import InputData from "../../components/atoms/input/inputProfil";
import Btn from "../../components/atoms/btn";
import { login } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";

function LoginPage(props) {
  const [noId, setnoId] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      noId,
      password,
    };
    if(user.noId === "" && user.password===""){
      swal("Data harus di isi semua",{icon: "warning",
        buttons: false,
        timer: 1500,
      });
    }else if(user.noId === ""){
      swal("Masukan NIY/NIDN/NIM",{icon: "warning",
        buttons: false,
        timer: 1500,
      });
    }else if(user.password === ""){
      swal("Masukan password",{icon: "warning",
        buttons: false,
        timer: 1500,
      });
    }
    else{
    dispatch(login(user));
    }
  };
  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }


  return (
    <Fragment>
      <div className="flex flex-col justify-between min-h-screen">
        <div className="flex flex-col container items-center mt-10">
           <img className="h-7" src={Logo} alt="Logo Homepage" />
          <form
            onSubmit={userLogin}
            className="flex flex-col w-48 px-5 py-3 bg-white shadow rounded-sm  mt-3"
          >
            <div className="my-0.5">
              <InputData
                value={noId}
                onChange={(e) => setnoId(e.target.value)}
                label="NIM/NIY/NIDN"
                type="text"
              />
            </div>
            <div className="my-0.5">
              <InputData
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                type="password"
              />
            </div>
            <div className="my-2">
              <Btn
                type="submit"
                label="Masuk"
                color="bg-blue-500 hover:bg-blue-400 w-full"
              />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default LoginPage;
