import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Touch.css";

gsap.registerPlugin(ScrollTrigger);

export default function Touch() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sectionRef = useRef(null);
  const inputRefs = useRef([]);
  const buttonRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId = "service_htv50nl";
    const templateId = "template_zdxjhsd";
    const publicKey = "KUBdAvB8MD3buqKqr";

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: "Misbah",
      message: message,
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("email send", response);
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        console.error("Error sending email", error);
      });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(inputRefs.current, { opacity: 0, y: 40 });
      gsap.set(buttonRef.current, { opacity: 0, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reset",
        },
      });

      tl.to(inputRefs.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });

      tl.to(
        buttonRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.4"
      );

      gsap.to(buttonRef.current, {
        backgroundColor: ["#ff4d6d", "#6dffea", "#ffd86d", "#8a6dff"],
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      buttonRef.current.addEventListener("mouseenter", () => {
        gsap.to(buttonRef.current, {
          scale: 1.08,
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
          duration: 0.3,
          ease: "power2.out",
        });
      });

      buttonRef.current.addEventListener("mouseleave", () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          boxShadow: "0 0 0 rgba(0,0,0,0)",
          duration: 0.3,
          ease: "power2.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="bgimgtouch">
      <div className="touchimgcolor">
        <form onSubmit={handleSubmit} className="emailform">
          <h2>
            K<span>eep</span> in t<span>ouch</span>
          </h2>
          <p>
            Stay connected with us for health tips, clinic updates, and easy appointment booking — we’re just a
            <br /> message away!
          </p>

         <div className="inputs">
           <input
            ref={(el) => (inputRefs.current[0] = el)}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="user_name"
            value={name}
            placeholder="Your Name"
          />
          <input
            ref={(el) => (inputRefs.current[1] = el)}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="user_email"
            value={email}
            placeholder="Email"
          />
          <textarea
            ref={(el) => (inputRefs.current[2] = el)}
            onChange={(e) => setMessage(e.target.value)}
            name="message"
            value={message}
            placeholder="Message"
          ></textarea>
          <button ref={buttonRef} type="submit" className="hero-btn">
            Get a Free Quote
          </button>
         </div>
        </form>
      </div>
    </div>
  );
}
