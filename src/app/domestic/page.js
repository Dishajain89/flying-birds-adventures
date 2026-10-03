import DomesticHero from '@/components/domasticPage/DomasticHero/DomesticHero'
import DomesticCardsData from '@/components/common/TripCards/DomesticCardsData'
import CustomizedConnect from '@/components/ui/CustomizedConnect/CustomizedConnect'
import React from 'react'
import TripCards from '@/components/common/TripCards/TripCards'

function Domestic() {
  return (
    <div>
      <DomesticHero/>
      <DomesticCardsData tagline="🦅 Explore the Beauty of India" title="Domestic Tour Packages" subtitle="Discover the best domestic trips in India with our curated selection of travel experiences. From scenic landscapes to cultural adventures, find your perfect getaway."/>
      <CustomizedConnect/>
    </div>
  )
}

export default Domestic