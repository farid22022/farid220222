import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function GsapMotionLayer({ mode = "public" }) {
  const curtainRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    let context;
    let cleanup = () => {};

    async function setup() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger")
      ]);

      gsap.registerPlugin(ScrollTrigger);

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      context = gsap.context(() => {
        const curtain = curtainRef.current;
        if (curtain) {
          const timeline = gsap.timeline();
          timeline
            .fromTo(
              curtain,
              { scaleX: 1, transformOrigin: "left center" },
              { scaleX: 0, duration: 0.95, ease: "expo.inOut" }
            )
            .fromTo(
              ".route-flash",
              { autoAlpha: 0.6, scaleX: 0, transformOrigin: "left center" },
              { autoAlpha: 0, scaleX: 1, duration: 0.75, ease: "power3.out" },
              "-=0.58"
            );
        }

        gsap.fromTo(
          "[data-gsap='hero'] > *",
          { autoAlpha: 0, y: 34, rotationX: -10, filter: "blur(12px)" },
          { autoAlpha: 1, y: 0, rotationX: 0, filter: "blur(0px)", duration: 1, stagger: 0.09, ease: "power4.out" }
        );

        gsap.utils.toArray(".gsap-reveal, section").forEach((element, index) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 56, scale: 0.985, filter: "blur(10px)" },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 1.05,
              delay: index === 0 ? 0 : 0.03,
              ease: "power4.out",
              scrollTrigger: {
                trigger: element,
                start: "top 84%",
                once: true
              }
            }
          );
        });

        ScrollTrigger.batch(".motion-stagger > *", {
          start: "top 88%",
          once: true,
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { autoAlpha: 0, y: 28, scale: 0.96, filter: "blur(8px)" },
              { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.8, stagger: 0.08, ease: "power3.out" }
            );
          }
        });

        gsap.utils.toArray("[data-parallax]").forEach((element) => {
          const speed = Number(element.dataset.parallax || 0.14);
          gsap.to(element, {
            yPercent: speed * -100,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.7
            }
          });
        });

        gsap.utils.toArray("[data-float]").forEach((element, index) => {
          gsap.to(element, {
            y: index % 2 === 0 ? -12 : 12,
            rotation: index % 2 === 0 ? -1.2 : 1.2,
            duration: 3.8 + index * 0.22,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        });

        const interactiveCards = gsap.utils.toArray(".glass, .space-card, .motion-card");
        interactiveCards.forEach((card) => {
          card.classList.add("premium-interactive");
          const rotateX = gsap.quickTo(card, "rotationX", { duration: 0.45, ease: "power3.out" });
          const rotateY = gsap.quickTo(card, "rotationY", { duration: 0.45, ease: "power3.out" });
          const lift = gsap.quickTo(card, "y", { duration: 0.45, ease: "power3.out" });
          const scale = gsap.quickTo(card, "scale", { duration: 0.45, ease: "power3.out" });

          function onMove(event) {
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;
            card.style.setProperty("--pointer-x", `${x * 100}%`);
            card.style.setProperty("--pointer-y", `${y * 100}%`);
            rotateX((0.5 - y) * 5);
            rotateY((x - 0.5) * 6);
            lift(-4);
            scale(1.012);
          }

          function onLeave() {
            rotateX(0);
            rotateY(0);
            lift(0);
            scale(1);
          }

          card.addEventListener("pointermove", onMove);
          card.addEventListener("pointerleave", onLeave);
          cleanup = ((previousCleanup) => () => {
            previousCleanup();
            card.removeEventListener("pointermove", onMove);
            card.removeEventListener("pointerleave", onLeave);
          })(cleanup);
        });

        gsap.utils.toArray(".motion-magnetic").forEach((item) => {
          const moveX = gsap.quickTo(item, "x", { duration: 0.34, ease: "power3.out" });
          const moveY = gsap.quickTo(item, "y", { duration: 0.34, ease: "power3.out" });

          function onMove(event) {
            const rect = item.getBoundingClientRect();
            moveX((event.clientX - rect.left - rect.width / 2) * 0.24);
            moveY((event.clientY - rect.top - rect.height / 2) * 0.24);
          }

          function onLeave() {
            moveX(0);
            moveY(0);
          }

          item.addEventListener("pointermove", onMove);
          item.addEventListener("pointerleave", onLeave);
          cleanup = ((previousCleanup) => () => {
            previousCleanup();
            item.removeEventListener("pointermove", onMove);
            item.removeEventListener("pointerleave", onLeave);
          })(cleanup);
        });

        if (mode === "dashboard") {
          gsap.fromTo(
            ".dashboard-sidebar",
            { autoAlpha: 0, x: -28 },
            { autoAlpha: 1, x: 0, duration: 0.7, ease: "power3.out" }
          );
          gsap.fromTo(
            ".dashboard-content > *",
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.05, ease: "power3.out" }
          );
        }

        ScrollTrigger.refresh();
      });
    }

    setup();

    return () => {
      cleanup();
      context?.revert();
    };
  }, [location.pathname, mode]);

  return (
    <>
      <div ref={curtainRef} className="route-curtain" aria-hidden="true" />
      <div className="route-flash" aria-hidden="true" />
    </>
  );
}
