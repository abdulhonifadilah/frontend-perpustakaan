import React, { Fragment } from 'react';

function index({judul, ket}) {
    return (
        <Fragment>
            <div className="flex flex-row items-center font-montserrat">
                <h5 className=" w-32 text-right mr-1 text-sm text-gray-800">{judul} :</h5>
                <p className="w-40 text-xs font-light">{ket}</p>
              </div>
        </Fragment>
    );
}

export default index;