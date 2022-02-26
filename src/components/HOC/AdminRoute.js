import React from "react";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => {
        const token = window.sessionStorage.getItem("token");
        const role = window.localStorage.getItem("role");
        if (token && role === 'admin') {
          
          return <Component {...props} />;
          
        }
         else {
          return <Redirect to={`/signin`} />;
        }
      }}
    />
  );
};

export default AdminRoute;
