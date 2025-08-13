import { useState, useEffect } from 'react';
import { API } from "../../config/axios";

const MobileNumberPopup = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(true); // Added loading state for initial check

  useEffect(() => {
    const checkMobileNumber = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsChecking(false);
          return; // Don't open popup if no token
        }

        const response = await API.get(`/user/info?token=${token}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Only open if user is logged in AND has no phone number
        setIsOpen(!response.data.phoneNumber || response.data.phoneNumber.trim() === '');
      } catch (error) {
        console.error("Error checking mobile number:", error);
        setIsOpen(false); // Ensure popup doesn't open on error
      } finally {
        setIsChecking(false);
      }
    };
    checkMobileNumber();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      // Validate phone number
      const trimmedNumber = phoneNumber.trim();
      if (!trimmedNumber) {
        setError('Please enter a valid phone number');
        return;
      }

      // Update phone number via API
      await API.put('/user/savemobile', {
        phoneNumber: trimmedNumber
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      // Close the popup on success
      setIsOpen(false);

    } catch (err) {
      console.error("Error updating phone number:", err);
      setError(err.response?.data?.message || 'Failed to update phone number. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Don't render anything while checking or if not open
  if (isChecking || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-black rounded-[50px_5px] border-4 border-[#3CBDB1] p-8 max-w-md w-full relative">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Please Provide Your Mobile Number
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-white mb-2">Mobile Number</label>
            <div className="flex items-center border-b border-[#3CBDB1] py-2">
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                placeholder="Enter your mobile number with country code"
                autoFocus
                required
                pattern="[+]{1}[0-9]{11,14}" // Basic pattern for country code + number
                title="Please include country code (e.g., +919876543210)"
              />
            </div>
          </div>
          
          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">
              {error}
            </div>
          )}
          
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-full max-w-[200px] h-[40px] text-lg tracking-wider border border-[#C8A217] rounded-full bg-black flex items-center justify-center text-white hover:bg-[#C8A217] transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
        
        <div className="mt-4 text-center text-sm text-[#3CBDB1]">
          This information is required to continue using our services.
        </div>
      </div>
    </div>
  );
};

export default MobileNumberPopup;