import React from 'react'
import { Globe } from 'lucide-react'

const Navbar = () => {
  return (
    <div className='flex items-cente p-4 text-white bg-white dark:bg-zinc-800'>
        <div>
            <Globe size={32} className='text-sky-600 ' />
        </div>
        <div>
            <div className='text-2xl font-bold text-black pl-4'>
                Globetrotter
            </div>
        </div>

    </div>
  )
}

export default Navbar