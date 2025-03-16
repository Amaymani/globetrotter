import React, {useState} from 'react'
import { Globe } from 'lucide-react'
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios'


const Navbar = () => {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState('')

  if (status === "loading") {
    return <p>Loading session...</p>;
  }


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

      <div className='w-full flex justify-end text-black'>
        {session ? (
          <div>
            <p>Welcome, {session.user.name}</p>
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        ) : (

          <button onClick={() => signIn("google")} className='mt-3 p-3 '>Sign in with Google</button>              
        )}
      </div>

    </div>
  )
}

export default Navbar