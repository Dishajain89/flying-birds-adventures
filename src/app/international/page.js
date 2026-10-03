import InternationalCardsData from '@/components/common/TripCards/InternatinalCardsData'
import InternationalHero from '@/components/internationalPage/InternationalHero/InternationalHero'
import CustomizedConnect from '@/components/ui/CustomizedConnect/CustomizedConnect'
import React from 'react'

function International() {
  return (
    <div>
      <InternationalHero />
      <InternationalCardsData tagline="🦅 Discover the World" title="All International Departures" subtitle="Zero hassle planning with curated group departures, verified 4-star stays, visa assistance, and certified trip leads."/>
      <CustomizedConnect/>
    </div>
  )
}

export default International