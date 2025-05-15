import React from "react";
import MobileNavbar from "./Header/MobileNavbar";
import Logo from "./Header/Logo";
import Actions from "./Header/Actions";
import Searchbar from "./Header/Searchbar";
import Navbar from "./Header/Navbar";
import Categoriesbar from "./Header/Categoriesbar";

export default function Header() {
  return (
    <header className="grid grid-cols-[auto_1fr_auto] grid-rows-3 sm:grid-rows-2 gap-2 p-2 items-center bg-card">
      <div className="sm:hidden order-1">
        <MobileNavbar />
      </div>
      <div className="order-1 sm:order-1">
        <Logo />
      </div>
      <div className="order-2 sm:order-3">
        <Actions />
      </div>
      <div className="col-span-3 sm:col-span-1 order-4 sm:order-2">
        <Searchbar />
      </div>
      <div className="hidden sm:block order-4">
        <Navbar />
      </div>
      <div className="sm:hidden col-span-3 order-6">
        <Categoriesbar />
      </div>
    </header>
  );
}
