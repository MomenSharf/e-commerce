import React from "react";
import DepartmentsSelector from "./DepartmentsSelector";
import { getAllDepartments } from "@/lib/actions/department.action";
import { Button } from "../ui/button";

export default async function Hero() {
  const depa = await getAllDepartments();

  console.log(depa.length);

  return (
    <div className="flex justify-center mt-5">
      <div className="sm:container w-full grid sm:grid-cols-3 sm:gap-3">
        <div className="hidden sm:block">
          <DepartmentsSelector />
        </div>
        <div
          className="col-span-2 bg-cover bg-right sm:rounded-md min-h-[200px] p-8 md:p-14"
          style={{
            backgroundImage: "url(/images/hero.png)",
          }}
        >
          <h3 className="text-sm font-semibold">Latest trending</h3>
          <h3 className="text-xl font-bold">Electronic items</h3>
          <Button className="mt-5">Shop now</Button>
        </div>
      </div>
    </div>
  );
}
