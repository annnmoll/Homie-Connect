import React from "react";
import Header from "../../common/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../common/Footer";

function HeaderLayout() {
  return (
    <div className="w-full min-h-screen h-full  flex flex-col gap-2  ">
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
}

export default HeaderLayout;
