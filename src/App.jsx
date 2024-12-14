import { BrowserRouter } from "react-router-dom";
import Main from "./components/Main";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store/store";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function App() {
  return (
    <div className="bg-black h-full w-full overflow-x-hidden">
      {/* <BrowserRouter> */}
      <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          <Main />
          <Toaster />
        </PersistGate>
      </Provider>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
