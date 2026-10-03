import AboutHero from '@/components/aboutPage/AboutBanner/AboutHero'
import Achievements from '@/components/aboutPage/Achievements/Achievements'
import Founder from '@/components/aboutPage/Founder/Founder'
import OurTeam from '@/components/aboutPage/OurTeam/OurTeam'
import WhatMakesUsDifferent from '@/components/aboutPage/WhatMakesUsDifferent/WhatMakesUsDifferent'
import React from 'react'

function About() {
  return (
    <div>
        <AboutHero/>
        <WhatMakesUsDifferent/>
        <Founder/>
        <OurTeam/>
        <Achievements/>
    </div>
  )
}

export default About