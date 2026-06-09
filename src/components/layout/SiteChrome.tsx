import { Navbar } from "./Navbar";
import { MobileMenu } from "./MobileMenu";
import { CartDrawer } from "./CartDrawer";
import { Cursor } from "@/components/ui/Cursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

/** Chrome global: navbar, menú móvil, drawer de carrito, cursor y progreso de scroll. */
export function SiteChrome() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <MobileMenu />
      <CartDrawer />
      <Cursor />
    </>
  );
}
