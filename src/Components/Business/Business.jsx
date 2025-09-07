import React, { useEffect, useRef } from 'react';
import './Business.css';
import kashanpic from '../Images/meet1.jpg';
import pic from '../Images/business2.jpg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Business() {
  const frontRef = useRef(null);
  const midRef = useRef(null);
  const backRef = useRef(null);
  const h1Ref = useRef(null);
  const pRefs = useRef([]);

  useEffect(() => {
    // Main entrance animation
    const tl = gsap.timeline({ defaults: { duration: 0.8, ease: 'power3.out' } });

    tl.fromTo(frontRef.current, { x: -200, opacity: 0 }, { x: 0, opacity: 1 })
      .fromTo(midRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.4')
      .fromTo(backRef.current, { x: 200, opacity: 0 }, { x: 0, opacity: 1 }, '-=0.5');

    // Scroll-triggered animation for heading
    gsap.fromTo(
      h1Ref.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: h1Ref.current,
          start: 'top 80%',
        },
        duration: 0.8,
        ease: 'power3.out',
      }
    );

    // Scroll-triggered animation for paragraphs
    pRefs.current.forEach((p, i) => {
      gsap.fromTo(
        p,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: p,
            start: 'top 85%',
          },
          duration: 0.8,
          delay: i * 0.1,
        }
      );
    });

    // Hover effect for images
    [frontRef.current, backRef.current].forEach((imgDiv) => {
      gsap.set(imgDiv, { transformOrigin: 'center center' });
      imgDiv.addEventListener('mouseenter', () => {
        gsap.to(imgDiv, { scale: 1.05, rotation: 2, duration: 0.3 });
      });
      imgDiv.addEventListener('mouseleave', () => {
        gsap.to(imgDiv, { scale: 1, rotation: 0, duration: 0.3 });
      });
    });

    // Color-changing span in heading
    gsap.to(h1Ref.current.querySelector('span'), {
      color: '#d86ea3ff',
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
  }, []);

  return (
    <div className="bgblackbus">
      <div className="flexbus">
        <div className="front" ref={frontRef}>
          <img src={kashanpic} alt="Front" />
        </div>
        <div className="mid" ref={midRef}>
          <h1 ref={h1Ref}>
            We are Grow <br />
            My <span>Business</span>
          </h1>
          {[
            `Welcome to DevkSystem (Software House), founded by Kashan Afzal Khan, where we empower learnerswith the skills needed to thrive in today’s digital world. We specialize in Web Development, Web Designing, Video Editing, and AI Services, offering practical, industry-relevant training that goes beyond theory.`,
            `Our hands-on projects and step-by-step learning approach help students build real-world experience while creating a strong portfolio. Whether you are a beginner looking to start your journey or a professional aiming to upgrade your skills, our flexible online programs are designed to meet your needs.`,
            `Guided by expert mentors, you’ll gain the confidence to work as a freelancer, build a career in IT, or explore opportunities in the global digital industry. At DevkSystem Academy, we believe in affordable, high-quality education that transforms learners into skilled professionals. Learn, build, and succeed with us.`,
          ].map((text, i) => (
            <p key={i} ref={(el) => (pRefs.current[i] = el)}>
              {text.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          ))}
          <button><a href="https://wa.me/923139614220">Meet The Team</a></button>
        </div>
        <div className="back" ref={backRef}>
          <img src={pic} alt="Back" />
        </div>
      </div>
    </div>
  );
}
