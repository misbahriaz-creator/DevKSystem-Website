import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Project.css'
import img1 from '../Images/project1.png'
import img2 from '../Images/project2.png'
import img3 from '../Images/project3.png'
import img4 from '../Images/project4.png'
import img5 from '../Images/project5.png'
import img6 from '../Images/project6.png'

gsap.registerPlugin(ScrollTrigger)

export default function Project() {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])
  const headingRef = useRef(null)

  cardRefs.current = []
  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el)
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRefs.current, {
        y: 80,
        rotationY: 15,
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.25,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      })

      cardRefs.current.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { scale: 1.05, rotationY: 0, duration: 0.5, ease: "power2.out" })
        })
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { scale: 1, rotationY: 15, duration: 0.5, ease: "power2.out" })
        })
      })

      gsap.to(headingRef.current.querySelectorAll("span"), {
        color: ["#4d5fffff", "#6dffea", "#ffd86d", "#1c1fc4ff"],
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
        ease: "power1.inOut"
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef}>
      <div className="bgcolorblack">
        <h1 ref={headingRef}>
          Projects <span>That</span> Speak for Thems<span>elves</span>
        </h1>
        <p>
          Here’s a glimpse of how we’ve helped businesses transform their <br />
          online presence
        </p>
      </div>
      <div className="images">
        <div className="imgcolor">
          <div className="fleximg">
            <div className="card" ref={addToRefs}>
              <img src={img1} />
              <img src={img2} />
            </div>
            <div className="card" ref={addToRefs}>
              <img src={img3} />
              <img src={img4} />
            </div>
            <div className="card" ref={addToRefs}>
              <img src={img5} />
              <img src={img6} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
