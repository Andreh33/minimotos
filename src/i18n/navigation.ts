import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/** Link/router/pathname conscientes del locale. Usar SIEMPRE estos en vez de next/link. */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
