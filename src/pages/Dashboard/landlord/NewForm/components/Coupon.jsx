import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

const VALID_COUPONS = ['tolet8764', 'SAVE20', 'DISCOUNT10']; // sample valid codes

const Coupon = () => {
  const [couponCode, setCouponCode] = useState('');
  const [isApplied, setIsApplied] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const handleProcessCoupon = () => {
    const trimmedCode = couponCode.trim();

    if (VALID_COUPONS.includes(trimmedCode)) {
      setIsApplied(true);
      setIsInvalid(false);
      console.log('Coupon applied:', trimmedCode);
    } else {
      setIsApplied(false);
      setIsInvalid(true);
      console.log('Invalid coupon:', trimmedCode);
    }
  };

  return (
    <div className="grid gap-y-6 mt-10 px-5 h-fit md:pr-0 md:grid-cols-2 md:gap-x-7 max-sm:px-2 max-sm:mt-6">
      <div>
        <label className="block mb-2 text-white text-base font-medium">
          Coupon
        </label>

        <div className="relative">
          <input
            type="text"
            placeholder="Enter coupon code"
            // required
            className={`bg-black w-full h-14 p-4 pr-12 rounded-md border text-white placeholder:text-[#C8C8C8] ${
              isInvalid
                ? 'border-red-500'
                : isApplied
                ? 'border-green-500'
                : 'border-[#C8C8C8]'
            }`}
            value={couponCode}
            onChange={(e) => {
              setCouponCode(e.target.value);
              setIsApplied(false);
              setIsInvalid(false);
            }}
            disabled={isApplied}
          />
          {isApplied && (
            <Check
              size={20}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-green-500"
            />
          )}
          {isInvalid && (
            <X
              size={20}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-red-500"
            />
          )}
        </div>

        {isInvalid && (
          <p className="text-red-500 text-sm mt-2">Invalid coupon code.</p>
        )}

        <div className="flex justify-end">
          <button
            onClick={handleProcessCoupon}
            disabled={isApplied || !couponCode.trim()}
            className={`mt-4 px-5 py-2 rounded-md transition-all ${
              isApplied
                ? 'bg-green-600 text-white cursor-default'
                : 'bg-green-700 text-white hover:bg-green-800'
            }`}
          >
            {isApplied ? 'Applied' : 'Proceed'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Coupon;
