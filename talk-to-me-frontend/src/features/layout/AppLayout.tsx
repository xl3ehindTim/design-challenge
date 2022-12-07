import * as React from 'react';
import { getUser } from '../auth/services/user.service';
import logo from "../../assets/img/GTLogo.png";
import Image from 'next/image'

function AppLayout({ children }: any) {
  const user = getUser();

  return (
    <>
      <div className="navbar">
        <div className="logo">
        <Image src={logo} height="40px" width="100px" alt="GreenTravels" />
        </div>
        <div className="greentravels">
          <h1>GreenTravels</h1>
        </div>
        <div className="knoppen">
          <><i className="fa-solid fa-house" style={{ fontSize:"20px" }}></i></>
          <><i className="fa-solid fa-user" style={{ fontSize:"20px" }}></i></>
          <><i className="fa-solid fa-basket-shopping" style={{ fontSize:"20px" }}></i></>
        </div>
      </div>

      <div style={{ maxWidth: "100%" }}>{children}</div>
    </>
  );
}

export default AppLayout;
