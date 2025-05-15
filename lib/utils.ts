import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fakePromise<T>(result: T, delayMs: number = 1000): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result);
    }, delayMs);
  });
}
