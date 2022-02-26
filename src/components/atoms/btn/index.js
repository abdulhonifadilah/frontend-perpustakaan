import React, { Fragment } from "react";

function Btn({ color, label, ...rest }) {
  return (
    <Fragment>
      <button
        className={`${color} font-crimson font-bold hover:shadow-md items-center text-center text-sm px-3 py-0.5 text-white rounded-sm focus:outline-none`}
      {...rest}
      >
        {label}
      </button>
    </Fragment>
  );
}

export default Btn;
