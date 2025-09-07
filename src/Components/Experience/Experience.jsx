import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Experience.css";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading scroll animation
      gsap.from(headingRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      // Button scroll animation
      gsap.from(buttonRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Button hover animation
      buttonRef.current.addEventListener("mouseenter", () => {
        gsap.to(buttonRef.current, {
          scale: 1.05,
          boxShadow: "0 8px 20px rgba(255,255,255,0.5)",
          duration: 0.4,
          ease: "power2.out",
        });
      });
      buttonRef.current.addEventListener("mouseleave", () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          boxShadow: "0 0 0 rgba(255,255,255,0)",
          duration: 0.4,
          ease: "power2.out",
        });
      });

      // Continuous background color animation
      gsap.to(sectionRef.current, {
        backgroundColor: "#ff7eb9",
        duration: 4,
        ease: "linear",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(sectionRef.current, {
        backgroundColor: "#7ebfff",
        duration: 4,
        ease: "linear",
        repeat: -1,
        yoyo: true,
        delay: 2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="purplebg">
      <h3 ref={headingRef}>
        We have experience and expertise from working with over <br />
        400+ businesses on their website strategy.
      </h3>
      <button ref={buttonRef}>We would love to work with you too!</button>
    </div>
  );
}
