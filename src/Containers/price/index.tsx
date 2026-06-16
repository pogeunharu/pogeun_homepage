import priceImage from "../../assets/Image/가격표4.png";

const PriceScreen = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 30,
        overflowX: "auto",
      }}
    >
      <div style={{ width: "95vw" }}>
        <img src={priceImage} width={"auto"} height={700} />
      </div>
    </div>
  );
};

export default PriceScreen;
