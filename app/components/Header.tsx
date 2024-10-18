"use client"
import { publicDecrypt } from 'crypto'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { signIn, useSession } from 'next-auth/react'
import app from '../Shared/firebaseConfig'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { HiBell, HiChat, HiSearch } from 'react-icons/hi'

function Header() {
  const { data: session } = useSession()
  const db = getFirestore(app)

  const saveUserInfo = async() => {
    if (session?.user) {
      await setDoc(doc(db, "user", session.user.email), {
        userName: session.user.name,
        email: session.user.email,
        userImage: session.user.image
      });
    }
  }

  useEffect(() => {
    saveUserInfo();
  }, [session])

  console.log(session)

  return (
    // Start of the Header
    <div className='flex flex-row items-center gap-3 md:gap-2 p-6'>
      {/* Pinterset Logo */}
      <Image src='/pinterest-logo.png' alt='Pinterest Logo' width={50} height={50} className='rounded-full cursor-pointer p-2 hover:bg-gray-300'/>

      {/* Explore Button */}
      <button className='bg-black rounded-full text-white p-2 px-4'>Explore</button>

      {/* Create Button */}
      <button className='rounded-full font-semibold p-2 px-4'>Create</button>

      {/* Div for Search Bar: long/desktop version: */}
      <div className='bg-[#e9e9e9] p-3 hidden md:flex flex-row gap-3 items-center rounded-full w-full'>
        <HiSearch className='text-[25px] text-gray-500'/>
        <input type='text' placeholder='Search' className='bg-transparent outline-none'/>
      </div>
      {/* Search Bar: Mobile Version */}
      <HiSearch className='text-[35px] text-gray-500 md:hidden'/>

      {/* Bell Button */}
      <HiBell className='text-[40px] text-gray-500'/>

      {/* Chat Button */}
      <HiChat className='text-[40px] text-gray-500'/>

      {/* Profile Image: Display "Login button if user's not logged in, if yes then display user's profile image" */}
      {session?.user?
        <Image src={session?.user?.image} alt='User Image' width={50} height={50} className='rounded-full cursor-pointer p-2 hover:bg-gray-300'/>:
        <button className='rounded-full font-semibold p-2 px-4' onClick={() => signIn()}>Login</button>
      }
    </div>
  )
}

export default Header