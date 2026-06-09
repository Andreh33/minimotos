"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { site } from "@/lib/site";

const darkStyle = {
  version: 8 as const,
  sources: {
    carto: {
      type: "raster" as const,
      tiles: [
        "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
        "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
        "https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
      ],
      tileSize: 256,
      attribution: "© OpenStreetMap © CARTO",
    },
  },
  layers: [{ id: "carto", type: "raster" as const, source: "carto" }],
};

export default function StoreMap() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const map = new maplibregl.Map({
      container: ref.current,
      style: darkStyle,
      center: [site.geo.lng, site.geo.lat],
      zoom: 14,
      scrollZoom: false,
      attributionControl: { compact: true },
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "bottom-right");

    // marcador de marca
    const el = document.createElement("div");
    el.style.cssText =
      "width:22px;height:22px;border-radius:999px;background:conic-gradient(from 210deg,#00C2FF,#1E7BFF,#7A2BFF,#FF1E8E,#FFC400,#2BFF6A,#00C2FF);box-shadow:0 0 18px rgba(30,123,255,.6);border:2px solid #050507";
    new maplibregl.Marker({ element: el })
      .setLngLat([site.geo.lng, site.geo.lat])
      .addTo(map);

    return () => map.remove();
  }, []);

  return <div ref={ref} className="h-full w-full" data-lenis-prevent aria-label="Mapa de la tienda" />;
}
