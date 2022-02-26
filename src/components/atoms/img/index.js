import React, { Fragment } from 'react';

function imgDetail({imgUrl}) {
    return (
        <Fragment>
            <img src={imgUrl} className=" object-cover w-40 h-40 bg-gray-300 mb-5" alt=""  />
        </Fragment>
    );
}

export default imgDetail;