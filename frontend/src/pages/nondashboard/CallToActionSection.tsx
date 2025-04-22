import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CallToActionSection = () => {
    return (
        <div className="relative py-24">
            <img
                src="/landing-call-to-action.jpg"
                alt="Rentiful Search Section Background"
                className="object-cover object-center w-full h-full"
            />
            {/* <div className="absolute inset-0 bg-black/40"></div> */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0 md:mr-10">
                        <h2 className="text-2xl font-bold text-white">
                        Find Your Dream Rental Property
                        </h2>
                    </div>
                    <div>
                        <p className="text-white mb-3">
                        Discover a wide range of rental properties in your desired
                        location.
                        </p>
                        <div className="flex justify-center md:justify-start gap-4">
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                className="inline-block text-primary-700 bg-white rounded-lg px-6 py-3 font-semibold hover:bg-primary-500 hover:text-primary-50"
                            >
                                Search
                            </button>
                            <Link
                                to="/signup"
                                className="inline-block text-white bg-secondary-500 rounded-lg px-6 py-3 font-semibold hover:bg-secondary-600"
                                preventScrollReset
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CallToActionSection;
