import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge condicional de clases Tailwind sin colisiones. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
