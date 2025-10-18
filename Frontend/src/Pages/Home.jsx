import React from 'react'
import Hero from '../Componenets/Hero'
import LatestCollection from '../Componenets/LatestCollection'
import BestSeller from '../Componenets/BestSeller'
import Ourpolicy from '../Componenets/Ourpolicy'
import News from '../Componenets/News'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <BestSeller/>
      <Ourpolicy/>
      <News/>
    </div>
  )
}

export default Home
