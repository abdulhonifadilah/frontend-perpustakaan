import React from "react";
import UserLayout from "../../../components/molecule/layout/user";
import { TabelHistory } from "../../../components/molecule/tabel";

function History(props) {
  return (
    <UserLayout>
      <div className="container flex flex-col">
          <TabelHistory/>
        </div>
    </UserLayout>
  );
}

export default History;
