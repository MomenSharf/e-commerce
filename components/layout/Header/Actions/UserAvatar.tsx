import { Button } from "@/components/ui/button";
import { CircleUser } from "lucide-react";
import React from "react";

export default function UserAvatar() {
  return (
    <Button size="icon" variant='ghost'>
      <CircleUser className="w-6 h-6"/>
    </Button>
  );
}
