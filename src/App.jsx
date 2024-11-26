// import{ useGSAP } from '@gsap/react';
// import { gsap } from 'gsap';
// import React, { useRef} from 'react'
import { BrowserRouter } from "react-router-dom";
import Main from "./components/Main";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function App() {
  // const browRef = useRef()
  //  useGSAP(()=>{
  //   gsap.fromTo(browRef.current, {x: -100, opacity: 0
  //  })
  //  })
 


  return (
    <div className="bg-black h-full w-full overflow-x-hidden">
      <BrowserRouter>
        <Provider store={store}>
          <Main />
          <Toaster />
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
