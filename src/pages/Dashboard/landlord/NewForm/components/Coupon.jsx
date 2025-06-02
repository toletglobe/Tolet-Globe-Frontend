import React from 'react'

const Coupon = () => {
  return (
    <>
        <div className="grid gap-y-12 mt-10 px-5 h-fit md:pr-0 md:grid-cols-2 md:gap-x-7 max-sm:gap-y-6 max-sm:mt-6 max-sm:px-2">
            <div>
                <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                    Coupon
                </label>
                <input
                    type="text"
                    placeholder="Enter coupon code"
                    required
                    className="bg-black w-[100%] h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
                    value=''
                    onChange={(e) => {
                    setFormData({  });
                    // for Debugging
                    // console.log("Formdata:", formData);
                    }}
                />
            </div>
        </div>
    </>
  )
}

export default Coupon