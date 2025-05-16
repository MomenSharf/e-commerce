import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import React from "react";

export default function Favorites() {
  return (
    <Button size="icon" variant="ghost">
      <Heart className="w-6 h-6" />
    </Button>
  );
}
