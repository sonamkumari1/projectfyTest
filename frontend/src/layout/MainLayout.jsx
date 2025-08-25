import Footer from "@/components/Home/Footer";
import Header from "@/components/Home/Header";

import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen dark:bg-black">
      <Header />
      <div className="flex-1 mt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
