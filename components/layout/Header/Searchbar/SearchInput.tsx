import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

export default function SearchInput() {
  return (
    <div className="relative flex w-full">
      <Search className="absolute left-1.5 top-1/2 -translate-y-1/2 w-5 h-4 outline-none text-muted-foreground" />
      <Input
        className="w-full pl-7 rounded-tr-none rounded-br-none"
        placeholder="Search"
      />
    </div>
  );
}
