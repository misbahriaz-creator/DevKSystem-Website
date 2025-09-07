import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Growth.css";

gsap.registerPlugin(ScrollTrigger);

export default function Growth() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const statRefs = useRef([]);
  const bgRef = useRef(null); // 🔥 light background ref

  // Collect stats refs
  statRefs.current = [];
  const addToStatsRefs = (el) => {
    if (el && !statRefs.current.includes(el)) {
      statRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.from(headingRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      // Animate paragraph
      gsap.from(paragraphRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Animate stats cards with stagger + 3D effect
      gsap.from(statRefs.current, {
        y: 50,
        opacity: 0,
        scale: 0.8,
        rotationX: 10,
        rotationY: -5,
        duration: 1,
        ease: "power4.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Animate heading spans color
      gsap.to(headingRef.current.querySelectorAll("span"), {
        color: ["#4dbeff", "#6dffea", "#ffd86d", "#8d547b"],
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
        ease: "power1.inOut",
      });

      // 🔥 Animate light background color
      gsap.to(bgRef.current, {
        backgroundColor: ["#f3f4f6", "#960468ff", "#0380aaff", "#eae6eeff"],
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
      <div className="bgcolorblackgrow">
        <h1 ref={headingRef}>
          We <span>are</span> the website <span className="underline">growth partners</span>
          <br />
          you've been <span>looking</span> for
        </h1>
        <p ref={paragraphRef}>
          If you are battling outdated, inefficient or simply unmanageable websites, our tailored <br />
          solutions ensure your online presence is not only visually dynamic and user-friendly but <br />
          also easy for you or your team to manage.
        </p>
      </div>

      {/* 🔥 Animated background */}
      <div className="lightbgcolor" ref={bgRef}>
        <div className="flexbg">
          <div className="first" ref={addToStatsRefs}>
            <h1>400+</h1>
            <h3>Websites Built</h3>
          </div>
          <div className="first" ref={addToStatsRefs}>
            <h1>4yrs</h1>
            <h3>Combined Experience</h3>
          </div>
          <div className="first" ref={addToStatsRefs}>
            <h1>30+</h1>
            <h3>5 Star Reviews</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
