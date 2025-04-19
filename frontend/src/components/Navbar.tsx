import { NAVBAR_HEIGHT } from '@/lib/constants'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"

const Navbar = () => {
    return (
        <div className="fixed top-0 left-0 w-full z-50 shadow-xl" style={{ height: `${NAVBAR_HEIGHT}px` }}>
            <div className="flex justify-between items-center w-full py-3 px-8 bg-primary-700 text-white">

                <div className='flex items-center gap-4 md:gap-6'>
                    <Link to={"/"} className='cursor-pointer hover:!text-primary-300' preventScrollReset>
                        <div className='flex items-center gap-3'>
                            <img src="/logo.svg" alt="Rentiful Logo" width={24} height={24} className='w-6 h-6'/>
                            <div className='text-xl font-bold'>
                                RENT
                                <span className="text-secondary-500 font-light hover:!text-primary-300">IFUL</span>
                            </div>
                        </div>
                    </Link>
                </div>

                <p className='text-primary-200 hidden md:block'>
                    Discover your perfect rental apartment with our advanced search
                </p>

                <div className='flex items-center gap-5'>
                    <Link to={"/signin"}>
                        <Button variant="outline" className='text-white bg-transparent hover:text-primary-700 rounded-lg'>
                            Home
                        </Button>
                    </Link>
                    <Link to="/signup">
                        <Button
                        variant="secondary"
                        className="text-white bg-secondary-600 hover:bg-white hover:text-primary-700 rounded-lg"
                        >
                        Sign Up
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar