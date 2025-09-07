import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type"; // 👈 npm install split-type
import "./Making.css";
import making1 from "../Images/making1.jpg";
import making2 from "../Images/making2.jpg";
import making3 from "../Images/making3.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function Making() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const imgRefs = useRef([]);
  const bgRef = useRef(null); // 👈 background ref

  imgRefs.current = [];
  const addToRefs = (el) => {
    if (el && !imgRefs.current.includes(el)) {
      imgRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split heading into words
      const splitHeading = new SplitType(headingRef.current, { types: "words" });

      // Animate heading words
      gsap.from(splitHeading.words, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Animate images
      gsap.from(imgRefs.current, {
        y: 50,
        opacity: 0,
        scale: 0.9,
        rotationX: 5,
        rotationY: -5,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Mirror hover effect
      imgRefs.current.forEach((img) => {
        img.addEventListener("mouseenter", () => {
          gsap.to(img, {
            scale: 1.05,
            rotateY: 180,
            duration: 0.8,
            ease: "power2.out",
          });
        });
        img.addEventListener("mouseleave", () => {
          gsap.to(img, {
            scale: 1,
            rotateY: 0,
            duration: 0.8,
            ease: "power2.out",
          });
        });
      });

      // 🔥 Background color animation
      gsap.to(bgRef.current, {
        backgroundColor: ["#0f0f0f", "#63254fff", "#1e4b5aff", "#50431aff"],
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      {/* 👇 animated background wrapper */}
      <div className="bgcolorblackmaking" ref={bgRef}>
        <h1 ref={headingRef}>
          <span>Our strength?</span> Making <br /> everything easier for you
        </h1>
      </div>

      <div className="blackmaking">
        <div className="fleximg">
          <div className="leftimg" ref={addToRefs}>
            <img src={making1} alt="" />
          </div>
          <div className="rightimg">
            <div ref={addToRefs}>
              <img src={making2} alt="" />
            </div>
            <div ref={addToRefs}>
              <img src={making3} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
