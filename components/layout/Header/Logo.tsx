import { Icons } from "@/components/icons";
import React from "react";

export default function Logo() {
  return (
    <div className="flex gap-1 font-bold items-center">
      <Icons.logo className="fill-primary" />
      <p className="text-lg text-primary/80 dark:text-primary-foreground">Shoppin</p>
    </div>
  );
}
