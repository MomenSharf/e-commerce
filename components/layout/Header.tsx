import Actions from "./Header/Actions";
import Logo from "./Header/Logo";
import MobileNavbar from "./Header/MobileNavbar";
import Navbar from "./Header/Navbar";
import Searchbar from "./Header/Searchbar";

export default function Header() {
  return (
    <header className="grid grid-cols-[auto_1fr_auto] grid-rows-2 sm:grid-rows-2 gap-2 items-center bg-card border-b pt-2">
      <div className="sm:hidden order-1 ml-2">
        <MobileNavbar />
      </div>
      <div className="order-1 sm:order-1 sm:ml-2">
        <Logo />
      </div>
      <div className="order-2 sm:order-3 mr-2">
        <Actions />
      </div>
      <div className="col-span-3 sm:col-span-1 order-4 sm:order-2 max-sm:border-t max-sm:p-2">
        <Searchbar />
      </div>
      <div className="hidden sm:block order-4 col-span-3">
        <Navbar />
      </div>
    </header>
  );
}
