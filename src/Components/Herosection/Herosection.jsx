import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Herosection.css";
import bgimg from "../Images/herobg.png";

gsap.registerPlugin(ScrollTrigger);

export default function Herosection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([headingRef.current, paraRef.current, buttonRef.current], {
        opacity: 0,
        y: 40,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reset",
        },
      });

      tl.to(headingRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
        .to(paraRef.current, { opacity: 1, y: 0, duration: 1 }, "-=0.5")
        .to(buttonRef.current, { opacity: 1, y: 0, duration: 1 }, "-=0.5");

      const elements = [headingRef.current, paraRef.current, buttonRef.current];
      gsap.to(elements, {
        color: ["#ab9898ff", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#8f00ff"],
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hero-section">
      <div className="bgimg">
        <div className="bgcolor">
          <h1 ref={headingRef}>
            Affordable <span>UI</span>/UX Design, Web <br />
            <span>Develop</span>ment & <span>AI</span> Solutions
          </h1>
          <p ref={paraRef}>
            DevK System delivers powerful websites, clean UI/UX,
            <br />
            and AI solutions that scale — without breaking your
            <br /> budget.
          </p>
          <button ref={buttonRef}>Let's Talk</button>
        </div>
      </div>
    </section>
  );
}
