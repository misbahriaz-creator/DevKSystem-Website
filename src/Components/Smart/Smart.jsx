import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Smart.css';
import card1 from '../Images/smart1.jpg';
import card2 from '../Images/smart2.jpg';
import card3 from '../Images/smart3.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function Smart() {
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
      // Background simple fade-in
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
          },
        }
      );

      // Heading slide + fade
      gsap.from(headingRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      // Paragraph slide + fade
      gsap.from(paraRef.current, {
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

      // Animate heading spans color
      gsap.to(headingRef.current.querySelectorAll("span"), {
        color: ["#ff4d6d", "#6dffea", "#ffd86d", "#ff6dd0"],
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
        ease: "power1.inOut",
      });

      // Cards stagger animation
      gsap.from(cardRefs.current, {
        y: 50,
        scale: 0.9,
        opacity: 0,
        rotationX: 5,
        rotationY: -5,
        duration: 1,
        ease: "power3.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Hover animation for cards
      cardRefs.current.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.05,
            rotationY: 0,
            rotationX: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            rotationY: -5,
            rotationX: 5,
            duration: 0.5,
            ease: "power2.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="bgcolorblacksmart">
      <h1 ref={headingRef}>
        Smart <span>&</span> Affordable <span>Digital</span> Solutions
      </h1>
      <p ref={paraRef}>
        We provide UI/UX Design, Web Development, and AI Solutions to help your business grow — at a <br /> fraction of the cost.
      </p>

      <div className="cardflex">
        <div className="card1" ref={addToCardRefs}>
          <img src={card1} alt="" />
          <h5>Web Development</h5>
          <h6>Custom websites & web apps, from <br /> front to backend.</h6>
        </div>
        <div className="card1" ref={addToCardRefs}>
          <img src={card2} alt="" />
          <h5>UI/UX Design</h5>
          <h6>Custom websites & web apps, from<br /> front to backend.</h6>
        </div>
        <div className="card1" ref={addToCardRefs}>
          <img src={card3} alt="" />
          <h5>AI Integration</h5>
          <h6>Chatbots, smart automation, and<br /> data-driven tools.</h6>
        </div>
      </div>
    </div>
  );
}
