import logo from "../../assets/Image/포근로고2-누끼.png";
import main from "../../assets/Image/main_wood.png";
import mainSmall from "../../assets/Image/main_wood_small.png";
import mainSmallTest from "../../assets/Image/main_wood_small_test.png";
import info1 from "../../assets/Image/전자바우처_text.png";
import info2 from "../../assets/Image/baby_text.png";
import info3 from "../../assets/Image/mother_text.png";
import info4 from "../../assets/Image/motherbaby_text.png";
import priceTitle from "../../assets/Image/service_title.png";
import IntroductionScreen from "../Introduction";
import ServiceScreen from "../Service";
import PriceScreen from "../price";
import RegistrationScreen from "../Registration";
import { useEffect, useRef, useState } from "react";

const MainScreen = () => {
  const [isColumn, setIsColumn] = useState(window.innerWidth <= 750);
  const [opacity, setOpacity] = useState(0);

  const infoRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const registRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsColumn(window.innerWidth <= 750);
      console.log(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // 0 ~ 200px 구간에서 0 → 1로 변화
      const newOpacity = Math.min(scrollY / 800, 0.5);
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onPressButton = () => {
    alert("PRESS!!");
  };

  return (
    <>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          width: "100%",
          alignItems: "center",
          background: "rgba(255, 255, 255, 1)",
          paddingBottom: 100,
          // background: "linear-gradient(45deg, #ffffff, #4b87ff 50%, #ffffff)",
          // background:
          //   "linear-gradient(60deg, #f07ba2, #ffffff 40% 60%, #f1bc2a)",
          // background: "linear-gradient(270deg, #ffae00, #f056a3)",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "clamp(200px, 40vw, 40vw)",
            top: "clamp(50px, 2.5vw, 50px)",
            left: "clamp(6px, 2vw, 30px)",
            background: "radial-gradient(circle,  #ffffff 30% , #ffffff00 70%)",
          }}
        >
          <img
            src={logo}
            width={"100%"}
            height={"100%"}
            style={{ zIndex: 2 }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              position: "fixed",
              left: 0,
              right: 0,
              padding: isColumn ? "10px 0px" : "20px 0px",
              backgroundColor: `rgba(167, 118, 46, ${opacity})`,
              zIndex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              <div
                style={{
                  paddingLeft: 10,
                  paddingRight: 10,
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 10px",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(5px, 3vw, 20px)",
                    color: "black",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    infoRef.current?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  포근소개
                </div>
              </div>
              <div
                style={{
                  marginLeft: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 10px",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(5px, 3vw, 20px)",
                    color: "black",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    priceRef.current?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  서비스안내
                </div>
              </div>
              <div
                style={{
                  marginLeft: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 10px",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(5px, 3vw, 20px)",
                    color: "black",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    registRef.current?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  상담신청
                </div>
              </div>
            </div>
          </div>
          {/* 이미지 슬라이더 영역 */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <img
              src={isColumn ? mainSmallTest : main}
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          <IntroductionScreen infoRef={infoRef} />
          <div style={{}}>
            {/* 로고 div */}

            {/* info div */}
            <div
              style={{
                display: "flex",
                flexDirection: isColumn ? "column" : "row",
                padding: 40,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  borderRadius: 15,
                  boxShadow: "2px 2px 5px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={info2}
                  style={{ width: "100%", height: "100%", borderRadius: 15 }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  background: "white",
                  borderRadius: 15,
                  boxShadow: "2px 2px 5px",
                  marginLeft: isColumn ? 0 : 20,
                  justifyContent: "center",
                  marginTop: isColumn ? 20 : 0,
                }}
              >
                <img
                  src={info3}
                  style={{ width: "100%", height: "100%", borderRadius: 15 }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  background: "white",
                  borderRadius: 15,
                  boxShadow: "2px 2px 5px",
                  marginLeft: isColumn ? 0 : 20,
                  justifyContent: "center",
                  marginTop: isColumn ? 20 : 0,
                }}
              >
                <img
                  src={info4}
                  style={{ width: "100%", height: "100%", borderRadius: 15 }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  background: "#ffffff",
                  borderRadius: 15,
                  boxShadow: "2px 2px 5px",
                  alignItems: "center",
                  justifyContent: "center",

                  marginLeft: isColumn ? 0 : 20,
                  marginTop: isColumn ? 20 : 0,
                }}
              >
                <img
                  src={info1}
                  style={{
                    width: "100%",
                    height: "100%",

                    borderRadius: 15,
                  }}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              width: "80vw",
              maxWidth: 1000,
              paddingTop: 80,
            }}
            ref={priceRef}
          >
            <img src={priceTitle} width={"100%"} height={"auto"} />
          </div>
          <ServiceScreen isColumn={isColumn} setIsColumn={setIsColumn} />
          <PriceScreen />

          <RegistrationScreen setIsColumn={setIsColumn} registRef={registRef} />

          {/* 버튼 div */}
          {/* <div
            style={{
              position: "absolute",
              flexDirection: "row",
              bottom: 100,
              width: "80%",
              maxWidth: 500,
            }}
          >
            <div
              style={{
                display: "flex",
                backgroundColor: "white",
                height: 80,
                marginTop: 20,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "3px 3px 5px 2px gray ",
              }}
              onClick={onPressButton}
            >
              정부지원 산후관리서비스
              <h3 style={{ color: "black", fontWeight: "bold" }}> 포근</h3>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default MainScreen;
