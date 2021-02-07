import React from 'react'

import Head from 'next/head'
import rocketSeatLogo from '../assets/logo.png';

const Home: React.FC = () => {
  return (
    <div>

      <main>
        <img src={rocketSeatLogo} alt="rocketseat"/>
      </main>

      <h1>Hello World</h1>
    </div>
  )
}

export default Home
