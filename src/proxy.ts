import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Evita api, admin, assets internos de Next, y ficheros con extensión.
  matcher: ["/((?!api|admin|_next|_vercel|.*\\..*).*)"],
};
