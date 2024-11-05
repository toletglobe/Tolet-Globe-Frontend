import { useLocation } from "react-router-dom";
import LandlordDashboardSidebar from "./LandlordDashboardSidebar";
import LandlordDashboardWelcome from "./LandlordDashboardWelcomePage";
import LandlordDashboardMyProperties from "./LandlordDashboardMyProperties";
import LandlordDashboardAddProperties from "./LandlordDashboardAddProperties";
import LandlordDashboardProfileForm from "./LandlordDashboardProfileForm";
import LandlordDashboardAccountSecurity from "./LandlordDashboardAccountSecurity";
import Service from "../../config/config";
import { useSelector } from "react-redux";

import { useEffect, useState } from "react";

export default function LandlordDashboard() {
  const location = useLocation();
  const [mainContent, setMainContent] = useState("Welcome");
  const [colored, setColored] = useState("Welcome");
  const [myProperties, setMyProperties] = useState([]);

  const authState = useSelector((state) => state.auth.userData);

  // console.log(authState);

  useEffect(() => {
    if (location.state && location.state.content) {
      setMainContent(location.state.content);
      setColored(location.state.content);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchMyProperties = async () => {
      try {
        const properties = await Service.fetchMyProperties(authState.id);
        // console.log(properties);
        setMyProperties(properties); // Store the fetched data in backendData

        // By default, sort by latest
        // const sortedProperties = properties.sort(
        //   (a, b) => new Date(b.date) - new Date(a.date)
        // );
        // setMyProperties(sortedProperties);

        // setLoading(false);
      } catch (error) {
        console.log(error);
        // setLoading(false); // Set loading to false if an error occurs
      }
    };

    fetchMyProperties();
  }, []);

  const ShowMainContent = (mainContent) => {
    if (mainContent === "Welcome") {
      return (
        <div key={`LandlordDashboardWelcome-${mainContent}`}>
          <LandlordDashboardWelcome myProperties={myProperties} />
        </div>
      );
    } else if (mainContent === "MyProperty") {
      return (
        <div key={`LandlordDashboardMyProperties-${mainContent}`}>
          <LandlordDashboardMyProperties myProperties={myProperties} />
        </div>
      );
    } else if (mainContent === "AddProperty") {
      return (
        <div key={`LandlordDashboardAddProperties-${mainContent}`}>
          <LandlordDashboardAddProperties />
        </div>
      );
    } else if (mainContent === "Profile") {
      return (
        <div key={`LandlordDashboardProfile-${mainContent}`}>
          <LandlordDashboardProfileForm />
        </div>
      );
    } else if (mainContent === "AccountSecurity") {
      return (
        <div key={`LandlordDashboardAccountSecurity-${mainContent}`}>
          <LandlordDashboardAccountSecurity />
        </div>
      );
    }
  };

  return (
    <>
      <div className="flex gap-x-2 items-center justify-center m-6 sm:flex-col lg:flex-row lg:items-start xl:flex-row xl:w-11/12 xl:gap-x-2 xl:justify-evenly xl:items-start">
        <div className="w-[25%] sm:w-[100%] lg:w-[10%] mt-5 xl:w-[26%] m-2 xl:mt-10">
          <LandlordDashboardSidebar
            mainContent={mainContent}
            setMainContent={setMainContent}
            colored={colored}
            setColored={setColored}
          />
        </div>

        <div className="w-[65%] sm:w-[100%] xl:w-[69%]">
          {ShowMainContent(mainContent)}
        </div>
      </div>
    </>
  );
}
