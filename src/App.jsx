import RoutingAuthServer from "./RoutingAuthServer";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store/store";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { APIProvider } from "@vis.gl/react-google-maps";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="bg-black h-full w-full overflow-x-hidden">
      {/* For Google Maps integration */}
      <APIProvider
        apiKey={`${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`}
        libraries={["places", "marker"]}
        version="beta"
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <Provider store={store}>
          <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
            <RoutingAuthServer />
            <Toaster />
            <ToastContainer />
          </PersistGate>
        </Provider>
      </APIProvider>
    </div>
  );
}

export default App;
