import { useEffect, useState } from "react";
import Select from "react-select";
import { options } from "./data";
import React from "react";

type Props = {
  isColumn: boolean;
  setIsColumn: React.Dispatch<React.SetStateAction<boolean>>;
};

const ServiceScreen = ({ isColumn, setIsColumn }: Props) => {
  const [currentValue, setCurrentValue] = useState<any>("");
  const [duration, setDuration] = useState<any>("");
  const [price, setPrice] = useState<any>(0);
  const [support, setSupport] = useState<any>(0);

  const options2 = [
    {
      value: "short",
      label: `단축형${currentValue?.durationType == 1 ? "(5일)" : currentValue?.durationType == 2 ? "(10일)" : "(15일)"}`,
    },
    {
      value: "standard",
      label: `표준형${currentValue?.durationType == 1 ? "(10일)" : currentValue?.durationType == 2 ? "(15일)" : "(20일)"}`,
    },
    {
      value: "long",
      label: `연장형${currentValue?.durationType == 1 ? "(15일)" : currentValue?.durationType == 2 ? "(25일)" : "(40일)"}`,
    },
  ];

  const onChangeValue = (v: any) => {
    setCurrentValue(v);
    setDuration("");
    setPrice(0);
    setSupport(0);
  };

  const onChangeDuration = (v: any) => {
    setDuration(v);
    console.log(v);
    setPrice(
      v?.value == "short"
        ? currentValue?.shortPrice
        : v?.value == "standard"
          ? currentValue?.standardPrice
          : currentValue?.longPrice,
    );
    setSupport(
      v?.value == "short"
        ? currentValue?.govSptShort
        : v?.value == "standard"
          ? currentValue?.govSptStandard
          : currentValue?.govSptLong,
    );
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      minHeight: "50px",
      borderRadius: "10px",
      border: "1px solid #E8EEF5",
      boxShadow: "none",
      paddingLeft: "8px",
      backgroundColor: "#fff",
      fontSize: "clamp(12px, 3vw, 20px)",
    }),

    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#F3F8FF" : "#fff",
      color: "#374151",
    }),

    menu: (provided: any) => ({
      ...provided,
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 10px 30px rgba(0,0,0,.08)",
    }),
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 30,
          justifyContent: "center",
          alignItems: "center",
          padding: "0px 20px",
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Select
              options={options}
              placeholder={"바우처 유형을 선택해주세요"}
              isSearchable={false}
              onChange={(v) => {
                onChangeValue(v);
                // if (document.activeElement instanceof HTMLElement) {
                //   document.activeElement.blur();
                // }
              }}
              value={currentValue}
              styles={customStyles}
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "row", marginLeft: 20 }}
          >
            <Select
              options={options2}
              isSearchable={false}
              placeholder={"서비스 기간을 선택해주세요"}
              onChange={(v) => onChangeDuration(v)}
              value={duration}
              styles={customStyles}
            />
          </div>
        </div>

        {price && support ? (
          <div
            style={{
              display: "flex",
              flexDirection: isColumn ? "column" : "row",
              marginTop: 50,
            }}
          >
            <div style={{ marginLeft: 20, color: "black" }}>
              서비스 금액{" : "}
              <span
                style={{
                  fontFamily: "EliceB",
                  fontSize: 20,
                }}
              >
                {price.toLocaleString()}
              </span>{" "}
              원
            </div>
            <div
              style={{
                marginLeft: 20,
                color: "black",
                marginTop: isColumn ? 10 : 0,
              }}
            >
              정부지원금{" : "}
              <span
                style={{
                  fontFamily: "EliceB",
                  fontSize: 20,
                  color: "rgb(255, 86, 86)",
                }}
              >
                {support.toLocaleString()}
              </span>{" "}
              원
            </div>
            <div
              style={{
                marginLeft: 20,
                color: "black",
                marginTop: isColumn ? 10 : 0,
              }}
            >
              본인부담금{" : "}
              <span
                style={{ fontFamily: "EliceB", fontSize: 20, color: "#42d100" }}
              >
                {(price - support).toLocaleString()}
              </span>{" "}
              원
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default ServiceScreen;
