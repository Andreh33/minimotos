import { Navbar } from "./Navbar";
import { MobileMenu } from "./MobileMenu";
import { CartDrawer } from "./CartDrawer";
import { Cursor } from "@/components/ui/Cursor";
import { ScrollGauge } from "@/components/ui/ScrollGauge";

/** Chrome global: navbar, menú móvil, drawer de carrito, cursor y gauge de scroll. */
export function SiteChrome() {
  return (
    <>
      <Navbar />
      <MobileMenu />
      <CartDrawer />
      <Cursor />
      <ScrollGauge />
    </>
  );
}
