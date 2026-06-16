type Props = {
  infoRef: React.RefObject<HTMLDivElement | null>;
};

const IntroductionScreen = ({ infoRef }: Props) => {
  return (
    <>
      <div
        ref={infoRef}
        style={{
          paddingTop: 100,
          paddingBottom: 100,
          paddingRight: 40,
          paddingLeft: 40,
        }}
      >
        <div
          style={{
            color: "black",
            fontSize: "clamp(20px, 2vw, 40px)",
            lineHeight: 1.5,
          }}
        >
          <span style={{ fontSize: "clamp(30px, 5vw, 70px)" }}>'포근'</span>은
          산모님의 회복이 가장 중요할 때, 아가의 소중한 시작의 순간,
          <br />
          <span
            style={{
              fontSize: "clamp(25px, 2.5vw, 50px)",
              color: "rgb(255, 124, 124)",
            }}
          >
            따뜻한 마음
          </span>
          과{" "}
          <span
            style={{
              fontSize: "clamp(25px, 2.5vw, 50px)",
              color: "rgb(197, 137, 7)",
            }}
          >
            전문적인 돌봄
          </span>
          으로 가족의 행복하고 포근한 일상을 함께 만들어갑니다.
        </div>
      </div>
    </>
  );
};

export default IntroductionScreen;
