"use client" // Provider or session management is on user's side
import { SessionProvider } from 'next-auth/react'
import React from 'react'

function Provider({children}) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default Provider