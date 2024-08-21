/* eslint-disable no-irregular-whitespace */
// import { Container } from 'react-bootstrap'
import { useEffect } from "react";
import $ from "jquery";
import "./about.css";
import "./about2.css";
import ceo1 from "../../assets/about/CEO1.png";
import ceo2 from "../../assets/about/CEO2.jpg";
import ceo3 from "../../assets/about/CEO3.jpeg";
import divi from "../../assets/about/division.png";
// import { Fplus } from '../components/faq'

const AboutUs = () => {
  useEffect(() => {
    const topoffset = document.getElementById("team-head");
    var agPosY; // Define agPosY variable

    var agTimelineLineProgress = $(".js-timeline_line-progress");
    var agTimelinePoint = $(".js-timeline-card_point-box");
    var agTimelineItem = $(".js-timeline_item");
    var agOuterHeight = $(window).outerHeight();
    // eslint-disable-next-line no-unused-vars
    var agHeight = $(window).height();
    var agFlag = false;

    function fnOnScroll() {
      agPosY = $(window).scrollTop(); // Assign value to agPosY
      fnUpdateFrame();
    }

    function fnOnResize() {
      agPosY = $(window).scrollTop(); // Assign value to agPosY
      agHeight = $(window).height();
      fnUpdateFrame();
    }

    function fnUpdateWindow() {
      agFlag = false;
      fnUpdateProgress();
    }

    function fnUpdateProgress() {
      var agTop = topoffset.offsetTop + 0;

      var i = agTop + agPosY - $(window).scrollTop();
      var a =
        agTimelineLineProgress.offset().top + agPosY - $(window).scrollTop();
      var n = agPosY - a + agOuterHeight / 2;
      if (i <= agPosY + agOuterHeight / 2) {
        n = i - a;
      }
      agTimelineLineProgress.css({ height: n + "px" });

      agTimelineItem.each(function () {
        var agTop = $(this).find(agTimelinePoint).offset().top;

        if (
          agTop + agPosY - $(window).scrollTop() <
          agPosY + 0.5 * agOuterHeight
        ) {
          $(this).addclassName("js-ag-active");
        } else {
          $(this).removeclassName("js-ag-active");
        }
      });
    }

    function fnUpdateFrame() {
      agFlag || requestAnimationFrame(fnUpdateWindow);
      agFlag = true;
    }

    $(window).on("scroll", fnOnScroll);
    $(window).on("resize", fnOnResize);

    return () => {
      $(window).off("scroll", fnOnScroll);
      $(window).off("resize", fnOnResize);
    };
  }, []);
  // const [isOpen1, setIsOpen1] = useState(false);
  // const [isOpen2, setIsOpen2] = useState(false);
  // const [isOpen3, setIsOpen3] = useState(false);
  // const [isOpen4, setIsOpen4] = useState(false);
  // const [isOpen5, setIsOpen5] = useState(false);

  // // Function to toggle open/close state for the first question
  // const toggleFAQ1 = () => {
  //   setIsOpen1(!isOpen1);
  // };

  // // Function to toggle open/close state for the second question
  // const toggleFAQ2 = () => {
  //   setIsOpen2(!isOpen2);
  // };
  // const toggleFAQ3 = () => {
  //   setIsOpen3(!isOpen3);
  // };
  // const toggleFAQ4 = () => {
  //   setIsOpen4(!isOpen4);
  // };
  // const toggleFAQ5 = () => {
  //   setIsOpen5(!isOpen5);
  // };

  return (
    <section className="about">
      <div className="head-title">
        <h1>About Us</h1>
      </div>
      <div className="js-timeline ag-timeline">
        <div className="js-timeline_line ag-timeline_line">
          <div className="js-timeline_line-progress ag-timeline_line-progress"></div>
        </div>

        <div className="timeline">
          <div className="checkpoint check1">
            <div>
              <h2>Who we are?</h2>
              <p>
                At To-Let, we are more than just property managers – we are
                dedicated partners in your property management journey.
                Established with a commitment to redefining the standards of
                property management, To-Let brings a wealth of expertise to the
                dynamic property management landscape.
              </p>
            </div>
          </div>
          <div className="checkpoint check2">
            <div>
              <h2>Our Journey</h2>
              <p>
                Since our inception, we have been at the forefront of delivering
                exceptional property management solutions. With a foundation
                built on integrity, transparency, and client-centric values,
                To-Let has steadily grown to become a trusted name in the
                industry.
              </p>
            </div>
          </div>
          <div className="checkpoint check3">
            <div>
              <h2>Mission and Vision</h2>
              <p>
                Our mission is to simplify and elevate the property management
                experience for property owners and tenants alike. We envision a
                future where seamless, efficient, and client-focused property
                management is the norm.
              </p>
            </div>
          </div>
          <div className="checkpoint check4">
            <div>
              <h2>Services we offer</h2>
              <p>
                To-Let specializes in a comprehensive suite of property
                management services, including property leasing, tenant
                screening, rent collection, property maintenance, and the
                provision of PGs (Pay Guest) and flats for rent. Our tailored
                solutions cater to the unique needs of each property under our
                care.
              </p>
            </div>
          </div>
          <div className="checkpoint check5">
            <div>
              <h2>Client-Centric Approach</h2>
              <p>
                What sets To-Let apart is our unwavering dedication to client
                satisfaction. We prioritize open communication, timely
                responses, and a proactive approach to address the diverse needs
                of property owners and tenants.
              </p>
            </div>
          </div>

          <div className="checkpoint check6">
            <div>
              <h2>Expert Team</h2>
              <p>
                Our team consists of seasoned professionals with in-depth
                knowledge of the property management industry. From property
                managers to maintenance experts, each member of the To-Let team
                is committed to ensuring the optimal performance and value
                of your property.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="team-container">
        <div id="team-head" className="mb-2">
          Our team
        </div>

        <div>
          <img className="imagd" src={divi} alt="division" />
        </div>

        <div className="team-images">
          <div className="flip-box">
            <div className="flip-box-inner">
              <div className="flip-box-front">
                <img
                  className="imagew"
                  src={ceo1}
                  alt="Founder"
                  style={{ width: "250px", height: "250px" }}
                />
              </div>
              <div className="flip-box-back">
                <a href="https://www.linkedin.com/in/mayur-kukreja-280b71b4/">
                  <h2>Mayur Kukreja</h2>
                  <p>CEO & Founder</p>
                </a>
              </div>
            </div>
          </div>

          <div className="flip-box">
            <div className="flip-box-inner">
              <div className="flip-box-front">
                <img
                  className="imagew"
                  src={ceo3}
                  alt="Co founder"
                  style={{ width: "250px", height: "250px" }}
                />
              </div>
              <div className="flip-box-back">
                <a href="https://www.linkedin.com/in/emanshu-wadhwani-258678176/">
                  <h2>Emanshu wadhwani</h2>
                  <p>Co-founder</p>
                </a>
              </div>
            </div>
          </div>

          <div className="flip-box">
            <div className="flip-box-inner">
              <div className="flip-box-front">
                <img
                  src={ceo2}
                  alt="Developer"
                  style={{ width: "250px", height: "250px" }}
                />
              </div>
              <div className="flip-box-back">
                <a href="https://www.linkedin.com/in/rohit-kanaujia-b775a5171/">
                  <h2>Rohit Kanaujia</h2>
                  <p>Co-founder</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Fplus /> */}
    </section>
  );
};

export default AboutUs;
