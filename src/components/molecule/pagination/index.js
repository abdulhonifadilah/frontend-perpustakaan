import React, { useEffect, useState } from "react";

export default function Pagination({ currentPage, setCurrentPage, totalPage }) {
  const [kembali, setKembali] = useState(false);
  const [selanjutnya, setSelanjutnya] = useState(false);
  const [display, setdisplay] = useState(false);
  useEffect(() => {
    const setPagination = () => {
      if (totalPage <= 1) {
        setdisplay(false);
      } else {
        setdisplay(true);
      }
      if (currentPage === totalPage) {
        setSelanjutnya(true);
      }else if (currentPage === 1) {
        setKembali(true);
      }else{
        setKembali(false);
        setSelanjutnya(false)
      }
    };
    setPagination();
  }, [currentPage, totalPage]);

  return (
    <div
      className={`${
        display ? "block" : "hidden"
      } block w-full justify-end my-3`}
    >
      <div className="flex ">
        <button
          disabled={kembali}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="text-xs hover:text-blue-400 font-crimson w-20 font-bold text-blue-500"
        >
          Kembali
        </button>
        <h1 className="text-gray-800 font-crimson text-xs font-semibold w-10 text-center">
          {currentPage}/{totalPage}
        </h1>
        <button
          disabled={selanjutnya}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="text-xs hover:text-blue-400 font-crimson w-20 font-bold text-blue-500"
        >
          Selanjutnya
        </button>
      </div>
    </div>
  );
}
