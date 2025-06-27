import React, { useState } from "react";
import { Check, X } from "lucide-react";
import { API } from "../../../../../config/axios";
import { useSelector } from "react-redux";

const Coupon = ({ formData, setFormData, couponUsage }) => {
  const [couponCode, setCouponCode] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const authState = useSelector((state) => state.auth);
  const userId = authState?.userData?.id;

  const handleProcessCoupon = async (event) => {
    event.preventDefault();
    const trimmedCode = couponCode.trim();

    if (!trimmedCode) return;

    try {
      const response = await API.post("/user/apply-coupon", {
        userId,
        couponCode: trimmedCode,
      });

      if (response.data.success) {
        setIsApplied(true);
        setIsInvalid(false);
        setErrorMessage("");
        setCouponCode(trimmedCode);
        setFormData((prev) => ({ ...prev, coupon: trimmedCode }));

        console.log("Coupon applied:", trimmedCode);
      } else {
        setIsApplied(false);
        setIsInvalid(true);
        setErrorMessage(response.data.message || "Invalid coupon.");
        setFormData((prev) => ({ ...prev, coupon: "" }));
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      setIsApplied(false);
      setIsInvalid(true);
      setErrorMessage(
        error?.response?.data?.message || "Invalid or used coupon."
      );
      setFormData((prev) => ({ ...prev, coupon: "" }));
    }
  };

  const handleResetCoupon = () => {
    setCouponCode("");
    setIsApplied(false);
    setIsInvalid(false);
    setErrorMessage("");
    setFormData((prev) => ({ ...prev, coupon: "" }));
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
            placeholder={
              couponUsage ? "Coupon already used!" : "Enter coupon code"
            }
            className={`bg-black w-full h-14 p-4 pr-12 rounded-md border text-white placeholder:text-[#C8C8C8] ${
              isInvalid
                ? "border-red-500"
                : isApplied
                ? "border-green-500"
                : "border-[#C8C8C8]"
            }`}
            value={couponCode}
            onChange={(e) => {
              setCouponCode(e.target.value);
              setIsApplied(false);
              setIsInvalid(false);
              setErrorMessage("");
            }}
            disabled={isApplied || couponUsage}
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

        {isInvalid && errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}

        <div className="flex justify-end gap-4">
          {(isApplied || isInvalid) && (
            <button
              onClick={handleResetCoupon}
              className="mt-4 px-5 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700 transition-all"
            >
              Edit
            </button>
          )}
          <button
            onClick={handleProcessCoupon}
            disabled={isApplied || !couponCode.trim()}
            className={`mt-4 px-5 py-2 rounded-md transition-all ${
              isApplied
                ? "bg-green-600 text-white cursor-default"
                : "bg-green-700 text-white hover:bg-green-800"
            }`}
          >
            {isApplied ? "Applied" : "Proceed"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Coupon;
