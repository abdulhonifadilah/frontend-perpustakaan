import React, { Fragment } from 'react';
import Logo from '../../../../assets/images/logoLogin.svg'

function LogoLogin(props) {
    return (
        <Fragment>
            <img className="h-7" src={Logo} alt="Logo Homepage" />
        </Fragment>
    );
}

export default LogoLogin;