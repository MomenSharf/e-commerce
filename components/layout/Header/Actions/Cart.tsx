import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export default function Cart() {
  return (
    <Button size='icon' variant='ghost'>
      <ShoppingCart />
    </Button>
  );
}
