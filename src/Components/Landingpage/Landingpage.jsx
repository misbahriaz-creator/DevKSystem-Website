import React from 'react'
import Navbar from '../Navbar/Navbar'
import Herosection from '../Herosection/Herosection'
import Project from '../Project/Project'
import Growth from '../Growth/Growth'
import Smart from '../Smart/Smart'
import Making from '../Making/Making'
import Meetteam from '../Meetteam/Meetteam'
import Experience from '../Experience/Experience'
import Touch from '../Touch/Touch'
import Footer from '../Footer/Footer'
import Business from '../Business/Business'
import Slider from '../Slider/Slider'

export default function Landingpage() {
  return (
    <div>
        <Navbar/>
        <Herosection/>
        <Project/>
        <Growth/>
        <Smart/>
        <Making/>
        <Business/>
        <Meetteam/>
        <Experience/>
        <Touch/>
        <Slider/>
        <Footer/>
            
    </div>
  )
}
