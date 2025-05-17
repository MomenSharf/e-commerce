"use client";
import { Loader } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getAllDepartments } from "@/lib/actions/department.action";
import { Department } from "@prisma/client";
import { useEffect, useState, useTransition } from "react";

export default function DepartmentsSelector() {
  const [departments, setDepartments] = useState<Department[] | null>(null);
  const [error, setError] = useState<unknown | null | Error>(null);
  const [isPending, startTransition] = useTransition();

  const fetchDepartments = async () => {
    try {
      const dbDpartment = await getAllDepartments();
      setDepartments(dbDpartment);
    } catch (error: unknown) {
      setError(error);
    }
  };

  useEffect(() => {
    if (!departments)
      startTransition(async () => {
        fetchDepartments();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Type a department" />
      <CommandList className="min-h-[300px]">
        {!isPending && !error && (
          <CommandEmpty>No Department found.</CommandEmpty>
        )}
        {isPending ? (
          <div className="flex justify-center items-center py-3 h-[300px]">
            <Loader className="animate-spin" />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-3 h-full">
            Error
          </div>
        ) : departments ? (
          departments.map((department) => (
            <CommandItem
              key={department.id}
              value={department.name}
              onSelect={() => {
                // setValue(currentValue === value ? null : currentValue);
                // setOpen(false);
              }}
            >
              {department.name}
              {/* <Check
                      className={cn(
                        "ml-auto",
                        value === category.name ? "opacity-100" : "opacity-0"
                      )} */}
              {/* /> */}
            </CommandItem>
          ))
        ) : (
          <div className="flex justify-center items-center py-3 h-[300px]">
            Error
          </div>
        )}
      </CommandList>
    </Command>
  );
}
