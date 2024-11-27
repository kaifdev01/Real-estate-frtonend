import React from 'react'

const EnquirySection = () => {
    return (
        <div className="bg-gray-800 h-[330px] lg:h-[200px]">
            <div className="container max-w-[85%] mx-auto px-4 flex flex-col sm:flex-row justify-between items-center h-full">
                {/* Text Section */}
                <div className="lg:text-left  sm:text-left sm:w-1/2">
                    <h2 className="text-4xl text-white mb-4 sm:mt-4 md:mt-4 lg:mt-4 mt-6">Prompt Consultant</h2>
                    <p className="text-white">
                        If you have any queries, feel free to contact our agent anytime. <br />
                        We are available online 24/7 to assist you.
                    </p>
                </div>

                {/* Button Section */}
                <div className="mt-6 mb-4 lg:mb-0 sm:mt-0 sm:w-auto ">
                    <button className="bg-white text-gray-800 px-6 py-3 rounded-md shadow-md hover:bg-gray-100 transition duration-300">
                        Enquiry Now
                    </button>
                </div>
            </div>
        </div>

    )
}

export default EnquirySection