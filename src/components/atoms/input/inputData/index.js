import React, { Fragment } from 'react';

function InputData({judul, ...rest}) {
    
    return (
        <Fragment>
            <div className="flex flex-row items-center justify-center my-0.5 font-montserrat">
                <h5 name={judul} id={judul} className=" w-28 text-right mr-1 text-xs">{judul} :</h5>
                <input className=" w-40 text-xs bg-gray-100 px-1 py-0.5 focus:outline-none" {...rest}/>
              </div>
        </Fragment>
    );
}

export default InputData;