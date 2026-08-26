import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useMotion() {
  useEffect(() => {
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          .from(".hero-copy .eyebrow, .hero-copy .cyan-rule", { y: 10, autoAlpha: 0, duration: 0.45, stagger: 0.06 })
          .from(".hero-copy h1", { y: 24, autoAlpha: 0, duration: 0.72 }, "-=0.24")
          .from(".hero-body, .hero-actions, .availability-form", { y: 16, autoAlpha: 0, duration: 0.52, stagger: 0.08 }, "-=0.42")
          .from(".hero-visual", { x: 20, autoAlpha: 0, duration: 0.82 }, "-=0.7");

        gsap.utils.toArray<HTMLElement>(".reveal").forEach((element, index) => {
          gsap.fromTo(
            element,
            { y: index % 2 ? 22 : 30, clipPath: "inset(0 0 8% 0)" },
            {
              y: 0,
              clipPath: "inset(0 0 0% 0)",
              duration: 0.68,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 88%", once: true },
            },
          );
        });

        [".trust-item", ".application-item", ".feature-item"].forEach((selector) => {
          const elements = gsap.utils.toArray<HTMLElement>(selector);
          if (!elements.length) return;
          gsap.from(elements, {
            y: 16,
            autoAlpha: 0,
            duration: 0.48,
            stagger: 0.07,
            ease: "power2.out",
            scrollTrigger: { trigger: elements[0].parentElement, start: "top 90%", once: true },
          });
        });

        gsap.fromTo(".order-grid", { "--line-progress": 0 }, {
          "--line-progress": 1,
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: { trigger: ".order-grid", start: "top 88%", once: true },
        });

        ScrollTrigger.create({
          trigger: ".map-wrap",
          start: "top 84%",
          once: true,
          onEnter: () => document.querySelector(".map-wrap")?.classList.add("is-active"),
        });

        gsap.to(".hero-visual", {
          "--hero-shift": "18px",
          "--hero-scale": 1.018,
          ease: "none",
          scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 0.8 },
        });

        gsap.to(".mist-layer", {
          xPercent: 2.5,
          ease: "none",
          scrollTrigger: { trigger: ".final-cta", start: "top bottom", end: "bottom top", scrub: 1 },
        });
      });
    });

    const onVisibility = () => {
      if (document.hidden) gsap.globalTimeline.pause();
      else gsap.globalTimeline.resume();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      media.revert();
      context.revert();
    };
  }, []);
}
