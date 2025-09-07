import React, { useState, useEffect, useRef } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landingpage from './Components/Landingpage/Landingpage';
import { gsap } from "gsap";
import { FaArrowUp, FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa"; // added FaWhatsapp

export default function App() {
  const [visible, setVisible] = useState(false);
  const linkedinRef = useRef(null);
  const githubRef = useRef(null);
  const backTopRef = useRef(null);

  const toggleVisible = () => {
    if (window.scrollY > 300) setVisible(true);
    else setVisible(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    // Social icons swapping animation
    const tlIcons = gsap.timeline({ repeat: -1, yoyo: true, defaults: { duration: 1, ease: "power1.inOut" } });
    tlIcons.to(linkedinRef.current, { x: 20, opacity: 0.5 })
           .to(githubRef.current, { x: -20, opacity: 0.5 }, "<")
           .to(linkedinRef.current, { x: 0, opacity: 1 })
           .to(githubRef.current, { x: 0, opacity: 1 }, "<");

    // Back to top floating animation
    gsap.to(backTopRef.current, {
      y: -20,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      duration: 1,
    });

    return () => {
      tlIcons.kill();
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Landingpage />} />
        </Routes>

        {/* Floating Social Icons */}
       <div className="social-icons">
  {/* WhatsApp */}
<a
  href="https://wa.me/923139614220"
  target="_blank"
  rel="noopener noreferrer"
  className="whatsapp"
>
  <FaWhatsapp size={26} />
</a>





  <a
    href="https://www.linkedin.com/in/kashan-afzal/" 
    target="_blank"
    rel="noopener noreferrer"
    ref={linkedinRef}
    className="linkedin"
  >
    <FaLinkedin size={26} />
  </a>

  <a
    href="https://github.com/kashanafzl" 
    target="_blank"
    rel="noopener noreferrer"
    ref={githubRef}
    className="github"
  >
    <FaGithub size={26} />
  </a>
</div>
        {/* Back to Top Button */}
        <button
          ref={backTopRef}
          className="back-to-top"
          onClick={scrollToTop}
          style={{ display: visible ? "flex" : "none" }}
        >
          <FaArrowUp size={20} />
        </button>
      </Router>
    </div>
  );
}
