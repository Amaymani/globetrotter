import React from 'react'
import { Badge } from './ui/badge'

const Hero = () => {
  return (
    <section className="container mx-auto px-6 py-6 flex flex-col justify-center items-center pt-16">
        {/* <Badge className={"bg-sky-300"}>Hello</Badge> */}

        <div className='text-4xl font-bold'>Globetrotter</div>
        <p className='text-lg text-center mt-4 text-gray-500 '>
          Guess famous destinations from cryptic clues and challenge your friends to beat your score!
        </p>

        
      </section>
  )
}

export default Hero