import React from 'react'
import { SidebarTrigger } from './ui/sidebar'

function AppHeader() {
  return (
    <header className='flex h-14 shrink-0 items-center px-4 gap-2 border-b bg-background'>
        <SidebarTrigger/>
    </header>
  )
}

export default AppHeader