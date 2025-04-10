import React from "react";
import Header from "../../common/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../common/Footer";

function HeaderFooterLayout() {
  return (
    <div className="w-full min-h-screen  flex flex-col">
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
}

export default HeaderFooterLayout;
