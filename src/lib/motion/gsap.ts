"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";

let registered = false;

/** Registra plugins GSAP una sola vez (client). */
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, Observer, SplitText, Flip);
  registered = true;
}

export { gsap, ScrollTrigger, Observer, SplitText, Flip };
