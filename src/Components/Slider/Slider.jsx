import React, { useRef, useEffect, useState } from "react";
import "./Slider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosStar } from "react-icons/io";
import pic1 from "../Images/1.png";
import pic2 from "../Images/2.png";
import pic3 from "../Images/3.png";
import pic4 from "../Images/4.png";
import pic5 from "../Images/5.png";
import link from "../Images/link.png";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import gsap from "gsap";

const slidesData = [
  {
    img: pic1,
    name: "Oliver Stent",
    text: "Grow My Business have set up a new website for my business...",
  },
  {
    img: pic2,
    name: "Suzee Wolstenholme",
    text: "We chose Grow My Business to do our website as we loved...",
  },
  {
    img: pic3,
    name: "Kareen Holland",
    text: "Great services quick and efficient. Get solutions quickly.",
  },
  {
    img: pic4,
    name: "Britta Christiansen",
    text: "Thanks Iona for your patience, your brilliance and your gentle nudges...",
  },
  {
    img: pic5,
    name: "Andrew",
    text: "The team at GMB were extremely helpful and efficient...",
  },
  {
    img: pic2,
    name: "Suzee Wolstenholme",
    text: "We chose Grow My Business to do our website as we loved...",
  }
];

export default function Slider() {
  const swiperRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  // handle resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // animate active slide-group
  const animateSlides = (index) => {
    const slides = document.querySelectorAll(
      `.swiper-slide:nth-child(${index + 1}) .mini-slide`
    );
    gsap.fromTo(
      slides,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
      }
    );
  };

  useEffect(() => {
    if (swiperRef.current) animateSlides(0);
  }, []);

  return (
    <div className="blackslider">
      <div className="flexhead">
        <h2>
          <span>People</span> says <span>about</span> work
        </h2>
        <button>See all our reviews</button>
      </div>

      <Swiper
        className="mySwiper"
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => animateSlides(swiper.activeIndex)}
      >
        {!isMobile ? (
          // Desktop → group slides in 3s
          slidesData.reduce((acc, _, i, arr) => {
            if (i % 3 === 0) {
              acc.push(
                <SwiperSlide key={i}>
                  <div className="slide-group">
                    {arr.slice(i, i + 3).map((s, idx) => (
                      <div className="mini-slide" key={idx}>
                        <div className="flex">
                          <div className="imgslide">
                            <img src={s.img} alt={s.name} />
                          </div>
                          <div className="divcont">
                            <h6>{s.name}</h6>
                            <div className="ic">
                              {[...Array(5)].map((_, i) => (
                                <IoIosStar key={i} className="star" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p>{s.text}</p>
                        <img src={link} alt="" className="link" />
                      </div>
                    ))}
                  </div>
                </SwiperSlide>
              );
            }
            return acc;
          }, [])
        ) : (
          // Mobile → 1 mini-slide per SwiperSlide
          slidesData.map((s, i) => (
            <SwiperSlide key={i}>
              <div className="mini-slide">
                <div className="flex">
                  <div className="imgslide">
                    <img src={s.img} alt={s.name} />
                  </div>
                  <div className="divcont">
                    <h6>{s.name}</h6>
                    <div className="ic">
                      {[...Array(5)].map((_, i) => (
                        <IoIosStar key={i} className="star" />
                      ))}
                    </div>
                  </div>
                </div>
                <p>{s.text}</p>
                <img src={link} alt="" className="link" />
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
}
