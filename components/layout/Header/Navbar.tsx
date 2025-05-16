import React from "react";
import NavLinks from "./Navbar/NavLinks";

export default function Navbar() {
  return (
    <div className="flex justify-between border-t p-2">
      <NavLinks />
    </div>
  );
}
