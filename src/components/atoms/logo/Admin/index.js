import React, { Fragment } from 'react';
import Logo from '../../../../assets/images/logoAdmin.svg'

function LogoAdmin(props) {
    return (
        <Fragment>
            <img className="h-7" src={Logo} alt="Logo Homepage" />
        </Fragment>
    );
}

export default LogoAdmin;