import React from 'react';
import ImgDetail from '../img';


function Upload({img, ...rest}) {
    return (
        <div className="flex flex-col">
            <ImgDetail imgUrl={img} />
            <input type="file" {...rest}  className="w-40 -mt-4 overflow-hidden font-light text-xs flex flex-col"/>
            
        </div>
    );
}

export default Upload;