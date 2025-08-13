import React, { useState } from "react";
import { Check, X } from "lucide-react";
import { API } from "../../../../../config/axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Coupon = ({ formData, setFormData }) => {
  const [couponCode, setCouponCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const authState = useSelector((state) => state.auth);
  const userId = authState?.userData?.id;

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    const token = localStorage.getItem("token");
    setIsLoading(true);
    
    try {
      const { data } = await API.post(
        "/user/check-coupon-usage",
        { userId, couponCode },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (data.valid) {
        setFormData({
          ...formData,
          coupon: couponCode,
          couponStatus: true
        });
        toast.success("Coupon applied successfully!");
      } else {
        toast.error(data.message || "Invalid coupon");
        setFormData({
          ...formData,
          coupon: "",
          couponStatus: false
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Coupon verification failed");
      setFormData({
        ...formData,
        coupon: "",
        couponStatus: false
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode("");
    setFormData({
      ...formData,
      coupon: "",
      couponStatus: false
    });
    toast.success("Coupon removed");
  };

  const isCouponApplied = formData.couponStatus && formData.coupon;

  return (
    <div className="grid gap-y-6 mt-10 px-5 h-fit md:pr-0 md:grid-cols-2 md:gap-x-7 max-sm:px-2 max-sm:mt-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <label className="text-white text-base font-medium">Coupon Code</label>
          <span className="text-gray-400 text-sm">(Optional)</span>
        </div>

        <div className="relative">
          <input
            type="text"
            className={`bg-black w-full h-14 p-4 pr-12 rounded-md border text-white placeholder:text-[#C8C8C8] ${
              isCouponApplied
                ? "border-green-500"
                : couponCode && !formData.couponStatus
                ? "border-red-500"
                : "border-[#C8C8C8]"
            }`}
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            disabled={isCouponApplied}
            placeholder="Enter coupon code (optional)"
          />
          
          {isCouponApplied && (
            <Check className="absolute top-1/2 right-4 transform -translate-y-1/2 text-green-500" />
          )}
          {couponCode && !formData.couponStatus && (
            <X className="absolute top-1/2 right-4 transform -translate-y-1/2 text-red-500" />
          )}
        </div>

        <div className="flex justify-end gap-4 mt-4">
          {isCouponApplied ? (
            <button
              type="button"
              onClick={handleRemoveCoupon}
              className="px-5 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700 transition-colors"
            >
              Remove Coupon
            </button>
          ) : (
            <button
              type="button"
              onClick={handleApplyCoupon}
              disabled={!couponCode.trim() || isLoading}
              className={`px-5 py-2 rounded-md ${
                isLoading 
                  ? "bg-gray-600 cursor-not-allowed" 
                  : "bg-green-700 hover:bg-green-800"
              } text-white transition-colors`}
            >
              {isLoading ? "Verifying..." : "Apply Coupon"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Coupon;