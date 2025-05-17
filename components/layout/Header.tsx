import { Separator } from "../ui/separator";
import Actions from "./Header/Actions";
import Logo from "./Header/Logo";
import MobileNavbar from "./Header/MobileNavbar";
import Navbar from "./Header/Navbar";
import Searchbar from "./Header/Searchbar";

export default function Header() {
  return (
    <header className="relative flex justify-center bg-card">
      <div className="w-full flex flex-col items-center">
        <div className="container p-2 sm:p-3 grid grid-cols-[auto_1fr_auto] grid-rows-2 sm:grid-rows-1 gap-x-2 gap-y-1 sm:gap-x-2 sm:gap-y-1 items-center">
          <div className="sm:hidden order-1">
            <MobileNavbar />
          </div>
          <div className="order-1 sm:order-1">
            <Logo />
          </div>
          <div className="order-2 sm:order-3">
            <Actions />
          </div>
          <div className="col-span-3 sm:col-span-1 order-4 sm:order-2 ">
            <Searchbar />
          </div>
        </div>
        <Separator className="hidden sm:block" />
        <div className="hidden sm:flex container p-3 justify-between">
          <Navbar />
          <div></div>
        </div>
      </div>
    </header>
  );
}
