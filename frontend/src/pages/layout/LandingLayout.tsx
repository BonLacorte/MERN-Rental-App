import Navbar from '@/components/Navbar'
import { NAVBAR_HEIGHT } from '@/lib/constants'
import React from 'react'
import { Outlet } from 'react-router-dom'

const LandingLayout = () => {
    return (
        <div className='h-full w-full'>
            <Navbar />
            
            <main className={`h-full flex w-full flex-col`} style={{ paddingTop: `${NAVBAR_HEIGHT}px`}}>
                <Outlet />
            </main>
        </div>
    )
}

export default LandingLayout