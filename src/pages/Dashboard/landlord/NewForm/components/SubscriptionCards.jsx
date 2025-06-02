import React from 'react'
import Pricing from "../PricngCard";

const SubscriptionCards = ({ formData }) => {
  return (
   <>
        {/* Subscription Cards */}
        <div>
            <Pricing formData={formData} />
        </div>
   </>
  )
}

export default SubscriptionCards