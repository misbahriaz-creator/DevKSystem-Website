import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Meetteam.css";
import meet1 from "../Images/meet1.jpg";
import meet2 from "../Images/meet2.jpg";
import meet3 from "../Images/meet3.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function Meetteam() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const cardRefs = useRef([]);

  cardRefs.current = [];
  const addToCardRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });

      gsap.from(paraRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      gsap.from(cardRefs.current, {
        y: 50,
        scale: 0.9,
        opacity: 0,
        rotationX: 5,
        rotationY: -5,
        duration: 1,
        ease: "power3.out",
        stagger: 0.3,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      cardRefs.current.forEach((card) => {
        const overlay = document.createElement("div");
        overlay.style.position = "absolute";
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.background = "rgba(255,255,255,0.1)";
        overlay.style.opacity = 0;
        overlay.style.borderRadius = "12px";
        overlay.style.pointerEvents = "none";
        card.style.position = "relative";
        card.appendChild(overlay);

        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.05,
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: "power2.out",
          });
          gsap.to(overlay, { opacity: 1, duration: 0.5, ease: "power2.out" });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            rotationX: 5,
            rotationY: -5,
            duration: 0.5,
            ease: "power2.out",
          });
          gsap.to(overlay, { opacity: 0, duration: 0.5, ease: "power2.out" });
        });
      });

      const headings = [headingRef.current, ...cardRefs.current.map(card => card.querySelector("h5"))];
      gsap.to(headings, {
        color: ["#24accaff", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#8f00ff"],
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      <div className="bgcolorblackmeet">
        <h1 ref={headingRef}>
          <span>Meet</span> the Team
        </h1>
        <p ref={paraRef}>
          At DevK System, we’re a passionate crew of tech creatives <br /> — small in size, big in results.
        </p>

        <div className="cardflex2">
          <div className="card2" ref={addToCardRefs}>
            <img src={meet1} alt="" />
            <h5>Founder</h5>
            <h6>Builds backend/frontend for all <br /> platforms</h6>
          </div>
          <div className="card2" ref={addToCardRefs}>
            <img src={meet2} alt="" />
            <h5>Designer</h5>
            <h6>Creates clean UI/UX for user <br /> engagement</h6>
          </div>
          <div className="card2" ref={addToCardRefs}>
            <img src={meet3} alt="" />
            <h5>AI Specialist</h5>
            <h6>Adds smart chatbots and<br /> automation</h6>
          </div>
        </div>
      </div>
    </div>
  );
}
