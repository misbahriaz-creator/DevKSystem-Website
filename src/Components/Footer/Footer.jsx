import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Footer.css";
import logo from "../Images/logo.png";
import { Tooltip } from "react-tooltip";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const midRef = useRef(null);
  const rightRef = useRef(null);
  const socialRefs = useRef([]);

  socialRefs.current = [];
  const addToSocialRefs = (el) => {
    if (el && !socialRefs.current.includes(el)) {
      socialRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-in sections
      [leftRef.current, midRef.current, rightRef.current].forEach((el, i) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 1,
          delay: i * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
          },
        });
      });

      // Social icons hover animation
      socialRefs.current.forEach((icon) => {
        icon.addEventListener("mouseenter", () => {
          gsap.to(icon, {
            scale: 1.2,
            color: "#a855f7", // example: purple glow
            duration: 0.3,
            ease: "power2.out",
          });
        });
        icon.addEventListener("mouseleave", () => {
          gsap.to(icon, {
            scale: 1,
            color: "#fff",
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="bgfooter">
      <div className="flexfooter">
        {/* Left Side */}
        <div className="leftfoot" ref={leftRef}>
          <div className="logofoot">
            <img src={logo} alt="" />
            <p>
              DevkSystem by Kashan Afzal Khan is a leading software<br /> house offering web design,  mobile applications, and custom<br /> IT solutions to help businesses grow.
            </p>
            <div className="iconssocial">
              <FaFacebookF ref={addToSocialRefs} className="fb" data-tooltip-id="fb-tip" data-tooltip-content="Follow on Facebook"/>
              <Tooltip id="fb-tip" place="top" />

              <FaInstagram ref={addToSocialRefs} className="insta" data-tooltip-id="insta-tip" data-tooltip-content="Follow on Instagram"/>
              <Tooltip id="insta-tip" place="top" />

              <FaYoutube ref={addToSocialRefs} className="yt" data-tooltip-id="yt-tip" data-tooltip-content="Subscribe on YouTube"/>
              <Tooltip id="yt-tip" place="top" />
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="midfoot" ref={midRef}>
          <ul className="footul">
            <li><h2>Business</h2></li>
            <li>Web Development</li>
            <li>UI & UX Designing</li>
            <li>AI Integration</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="rightfoot" ref={rightRef}>
          <ul className="footul">
            <li><h2>Information</h2></li>
            <li>
              <a href="mailto:devksystem@gmail.com" className="iflexright" target="_blank" rel="noopener noreferrer" data-tooltip-id="gmail-tip" data-tooltip-content="Send us an Email">
                <div className="bgi"><SiGmail className="gmail" /></div>
                <h6>devksystem@gmail.com</h6>
              </a>
              <Tooltip id="gmail-tip" place="top" />
            </li>
            <li>
              <a href="https://www.google.com/maps?q=Mia+Khel+bazar" className="iflexright" target="_blank" rel="noopener noreferrer" data-tooltip-id="loc-tip" data-tooltip-content="View on Google Maps">
                <div className="bgi"><FaLocationDot className="locate" /></div>
                <h6>Location: Mian Khel bazar</h6>
              </a>
              <Tooltip id="loc-tip" place="top" />
            </li>
            <li>
              <a href="tel:+923139614220" className="iflexright" data-tooltip-id="phone-tip" data-tooltip-content="Call Us">
                <div className="bgi"><FaPhoneAlt className="phone" /></div>
                <h6>+92 3139614220</h6>
              </a>
              <Tooltip id="phone-tip" place="top" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
