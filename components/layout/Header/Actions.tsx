import React from "react";
import { ModeToggle } from "./Actions/ToggleMode";
import Cart from "./Actions/Cart";
import UserAvatar from "./Actions/UserAvatar";
import Favorites from "./Actions/Favorites";

export default function Actions() {
  return (
    <div className="flex gap-1">
      <ModeToggle />
      <Cart />
      <Favorites />
      <UserAvatar />
    </div>
  );
}
