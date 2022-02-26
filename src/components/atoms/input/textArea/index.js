import React, { Fragment } from 'react';

function TextArea({judul, ...rest}) {
    return (
        <Fragment>
            <div className="flex flex-row justify-center my-1 items-start font-montserrat">
                <h5 name={judul} id={judul} className=" w-24 text-right mr-1 text-xs">{judul} :</h5>
                <textarea {...rest} name={judul} id={judul} className="py-0.5 px-1 w-40 focus:outline-none bg-gray-100 text-xs"></textarea>
              </div>
        </Fragment>
    );
}

export default TextArea;