import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

const HeroSection = () => {
    return (
        <div className="relative h-screen w-full">
            <img
                src="/landing-splash.jpg"
                alt="Rentiful Rental Platform Hero Section"
                className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <div className="max-w-4xl mx-auto px-6 sm:px-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Start your journey to finding the perfect place to call home
                    </h1>
                    <p className="text-lg md:text-xl text-white mb-8">
                        Explore our wide range of rental properties tailored to fit your
                        lifestyle and needs!
                    </p>

                    <div className="flex justify-center">
                        <Input
                        type="text"
                        // value={searchQuery}
                        // onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by city, neighborhood or address"
                        className="w-full max-w-lg rounded-none rounded-l-xl border-none bg-white h-12"
                        />
                        <Button
                        // onClick={handleLocationSearch}
                        className="bg-secondary-500 text-white rounded-none rounded-r-xl border-none hover:bg-secondary-600 h-12"
                        >
                        Search
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default HeroSection