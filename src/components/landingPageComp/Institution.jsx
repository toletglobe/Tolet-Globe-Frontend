import ibs from "../../assets/Institution/ibs.svg";
import ipcpsimg from "../../assets/Institution/IpcpsImg.svg";
// import ipcpsText from "../../assets/Institution/IpcpText.svg";
import UniversityOgLakhnaw from "../../assets/Institution/UniversityOfLakhnaw.svg";
import NPGC from "../../assets/Institution/NPGC.svg";
import RCD from "../../assets/Institution/RCd.svg";
import SSDC from "../../assets/Institution/SSCD.svg";
import NMIMS from "../../assets/Institution/NMIMS.svg";
import IIM from "../../assets/Institution/IIM.svg";
import Jaipiria from "../../assets/Institution/Jaipuria.svg";
import MSITD from "../../assets/Institution/MSITD.svg";
import IMT from "../../assets/Institution/IMT-Nagpur.svg";

const Institution = () => {
  const images = [
    { src: IMT, title: "IMT Nagpur" },
    { src: ibs, title: "IBS, Hyderabad" },
    { src: UniversityOgLakhnaw, title: "Lucknow University, Lucknow" },
    { src: NPGC, title: "National PG College, Lucknow" },
    { src: MSITD, title: " Institute of Technology, Delhi" },
    { src: SSDC, title: "Swami Shraddhanand College, Delhi" },
    { src: RCD, title: "Ramjas College, Delhi" },
    { src: NMIMS, title: "NMIMS, Mumbai" },
    { src: IIM, title: "IIM Kashipur" },
    {
      src: ipcpsimg,
      title: "Public College of Professional Studies, Lucknow",
      className: "bg-white",
    },
    { src: Jaipiria, title: "Jaipuria College, Lucknow" },
  ];

  return (
    <div className="margin">
      <div className="flex flex-col items-center justify-cente">
        <h3 className="w-full max-w-[1078.22px] h-auto font-poppins font-medium text-[24px] leading-[36px] text-center text-[#1D5F58] sm:text-[36px] sm:leading-[48px] md:text-[42.6667px] md:leading-[64px]">
          Partnered Universities
        </h3>

        <p className="w-full max-w-[1078.22px] h-auto font-poppins font-medium text-[11.5556px] leading-[17px] text-center text-[#C8A117] sm:w-[1078.22px]">
          We are proud to collaborate with some of the most prestigious colleges
          and universities across the country for college placements, including:
        </p>
      </div>

      <div className="overflow-hidden mt-10">
        <div className="animate-marquee flex items-center justify-center">
          <div className="marquee">
            {images.concat(images).map((image, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center mx-9 my-5"
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="max-w-[900px] max-h-[900px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Institution;