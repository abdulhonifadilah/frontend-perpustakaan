import React, { Fragment } from 'react';

function index({label,type, ...rest}) {
    return (
        <Fragment>
            <div className="flex flex-col">
                <p className="text-xs font-light text-gray-600">{label}</p>
                <input {...rest} autoComplete="none" type={type} className=" focus:outline-none w-full px-1 py-0.5 text-gray-600 text-xs bg-gray-200 rounded-sm"/>
            </div>
        </Fragment>
    );
}

export default index;