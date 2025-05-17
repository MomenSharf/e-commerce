"use client";

import { Check, ChevronsUpDown, Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { useEffect, useRef, useState, useTransition } from "react";
import { getAllCategories } from "@/lib/actions/category.actions";

export default function CategorySelector() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<null | string>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [error, setError] = useState<unknown | null | Error>(null);
  const [isPending, startTransition] = useTransition();

  const fetchCategories = async () => {
    try {
      const dbCategories = await getAllCategories();
      setCategories(dbCategories);
    } catch (error: unknown) {
      setError(error);
    }
  };

  useEffect(() => {
    if (open && !categories)
      startTransition(async () => {
        fetchCategories();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[150px] md:w-[200px] justify-between rounded-tl-none rounded-bl-none md:rounded-none border-x-0 max-sm:text-xs"
        >
          <span className="truncate" title={value ?? ""}>
            {value ?? "All Categories"}
          </span>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 relative max-sm:right-2">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            {!isPending && <CommandEmpty>No Category found.</CommandEmpty>}
            <CommandGroup>
              {isPending ? (
                <div className="flex justify-center items-center py-3">
                  <Loader className="animate-spin" />
                </div>
              ) : error ? (
                <div className="flex justify-center items-center py-3">
                  Error
                </div>
              ) : categories ? (
                categories.map((category) => (
                  <CommandItem
                    key={category.id}
                    value={category.name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? null : currentValue);
                      setOpen(false);
                    }}
                  >
                    {category.name}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === category.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))
              ) : (
                <div className="flex justify-center items-center py-3">
                  Error
                </div>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
