// -----------Birds Img------------
import bird1 from "../../../assets/birds/bird1.svg";
import bird2 from "../../../assets/birds/bird2.svg";

// -----------Cloud IMG------------
import cloud1 from "../../../assets/cloud/cloud1.svg";
import cloud2 from "../../../assets/cloud/cloud2.svg";
import cloud3 from "../../../assets/cloud/cloud3.svg";

//------------Hand IMG--------------

// ------------Home Img-------------
import chimney from "../../../assets/home/chimney.svg";
import wall1 from "../../../assets/home/wall-1.svg";
import wall2 from "../../../assets/home/wall-2.svg";
import roof1 from "../../../assets/home/roof.svg";
import roof3 from "../../../assets/home/backroof.svg";
import roof2 from "../../../assets/home/roof-top.svg";
import roof4 from "../../../assets/home/rooftop1.svg";
import gate from "../../../assets/home/gate.svg";
import frontw1 from "../../../assets/home/window1.svg";
import frontw2 from "../../../assets/home/window2.svg";
import frontw3 from "../../../assets/home/window3.svg";
import frontw4 from "../../../assets/home/window4.svg";
import frontw5 from "../../../assets/home/window5.svg";
import frontw6 from "../../../assets/home/window6.svg";

// ---------- Plant Img----------
import plant1 from "../../../assets/plant/plant1.svg";
import plant2 from "../../../assets/plant/plant2.svg";

//--------------Sun IMG-------------
import sun from "../../../assets/sun/sun.svg";

const TopBg = () => {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 5) {
      document.body.classList.add("scrolled");
    }
  });
  return (
    <>
      {/* -----------------Top Component----------------- */}
      <div className="w-[6.8rem] -translate-y-[400px] translate-x-[400px]">
        <div className="top-img">
          {/* ---------- Birds Image ---------- */}

          <img src={bird1} alt="Home Img" className="Tbird-1" />
          <img src={bird2} alt="Home Img" className="Tbird-2" />

          {/* -----------Cloud Images---------- */}

          <img src={cloud1} alt="" className="Tcloud-1" />
          <img src={cloud2} alt="" className="Tcloud-2" />
          <img src={cloud3} alt="" className="Tcloud-3" />

          {/*----------Sun Image -------------- */}
          <img src={sun} alt="Home Img" className="Tsun-circle" />

          {/* -----------Plant Imaages----------- */}
          <img src={plant1} alt="" className="Tplant-1" />
          <img src={plant2} alt="" className="Tplant-2" />

          {/* ----------Home Images------------ */}
          <img src={roof3} alt="" className="Troof-3" />
          <img src={wall1} alt="" className="Twall-1" />
          <img src={wall2} alt="" className="Twall-2" />
          <img src={gate} alt="" className="Tgate" />
          <img src={frontw1} alt="" className="Twindow-1" />
          <img src={frontw2} alt="" className="Twindow-2" />
          <img src={frontw3} alt="" className="Twindow-3" />
          <img src={frontw4} alt="" className="Twindow-4" />
          <img src={frontw5} alt="" className="Twindow-5" />
          <img src={frontw6} alt="" className="Twindow-6" />
          <img src={roof1} alt="" className="Troof-1" />
          <img src={roof4} alt="" className="Troof-4" />
          <img src={roof2} alt="" className="Troof-2" />
          <img src={chimney} alt="" className="Tchimney" />

          {/* -----------Hand Images----------- */}
        </div>
      </div>
    </>
  );
};
export default TopBg;
