"use client";
import { NAV_LINKS } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <ul className="flex gap-5">
      {NAV_LINKS.map(({ label, href }) => {
        return (
          <li key={label}>
            <Link href={href}>
              <span
                className={cn('',{
                  "text-primary": pathname === href,
                })}
              >
                {label}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
