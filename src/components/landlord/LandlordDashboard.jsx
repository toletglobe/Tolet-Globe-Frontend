import LandlordDashboardSidebar from "./LandlordDashboardSidebar";
import LandlordDashboardWelcome from "./LandlordDashboardWelcomePage";
import LandlordDashboardMyProperties from "./LandlordDashboardMyProperties";
import LandlordDashboardAddProperties from "./LandlordDashboardAddProperties";

import { useState } from "react";

export default function LandlordDashboard() {

  const [mainContent, setMainContent] = useState("Welcome");

  const ShowMainContent = (mainContent) => {
    if (mainContent === "Welcome") {
      return (
        <div key={`LandlordDashboardWelcome-${mainContent}`}>
          <LandlordDashboardWelcome />
        </div>
      );
    } else if (mainContent === "MyProperty") {
      return (
        <div key={`LandlordDashboardMyProperties-${mainContent}`}>
          <LandlordDashboardMyProperties />
        </div>
      );
    } else if (mainContent === "AddProperty") {
      return (
        <div key={`LandlordDashboardAddProperties-${mainContent}`}>
          <LandlordDashboardAddProperties />
        </div>
      );
    }    //Need more code here "Setting" Page and "LogOut" Link
  }

  
  return (
    <>
      <div className="w-[100vw] mt-16 ml-16 flex">
        <div className="w-[27%]">
          <LandlordDashboardSidebar
            mainContent={mainContent}
            setMainContent={setMainContent}
          />
        </div>

        <div className="w-[62%]">
          {ShowMainContent(mainContent)}
        </div>
      </div>
    </>
  );
}
