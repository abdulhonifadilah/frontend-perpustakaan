import React, { Fragment } from 'react';
import Logo from '../../../../assets/images/Homepage.svg'

function LogoAnggota(props) {
    return (
        <Fragment>
            <img className="h-7" src={Logo} alt="Logo Homepage" />
        </Fragment>
    );
}

export default LogoAnggota;