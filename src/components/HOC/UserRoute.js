import React from "react";
import { Route, Redirect } from "react-router-dom";

const UserRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => {
        const token = window.sessionStorage.getItem("token");
        const role = window.localStorage.getItem("role");
        if (token && role ==='user') {
          
          return <Component {...props} />;
          
        }if(token && role === 'admin'){
          return <Redirect to={`/admin`}/>
        }
         else {
          return <Redirect to={`/signin`} />;
        }
      }}
    />
  );
};

export default UserRoute;
