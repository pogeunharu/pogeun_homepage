import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { REGION_DATA } from "./data";
import { supabase } from "../../lib/supabase";

type Option = {
  value: string;
  label: string;
};

type Props = {
  setIsColumn: React.Dispatch<React.SetStateAction<boolean>>;
  registRef: React.RefObject<HTMLDivElement | null>;
};

const RegistrationScreen = ({ setIsColumn, registRef }: Props) => {
  const [region, setRegion] = useState<Option | null>({
    value: "경기도",
    label: "경기도",
  });
  const [city, setCity] = useState<Option | null>({
    value: "용인시",
    label: "용인시",
  });
  const [isChecked, setIsChecked] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [contents, setContents] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [isRegColumn, setRegColumn] = useState(window.innerWidth <= 1180);

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setRegColumn(window.innerWidth <= 1180);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      width: "clamp(120px, 38vw, 200px)",
      minHeight: "40px",
      borderRadius: "5px",
      border: "1px solid #000000",
      boxShadow: "none",
      paddingLeft: "8px",
      backgroundColor: "#fff",
      fontSize: "clamp(2px, 5vw, 18px)",
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

  const regionOption = Object.keys(REGION_DATA).map((region) => ({
    value: region,
    label: region,
  }));

  const cityOption = REGION_DATA[region?.value as keyof typeof REGION_DATA].map(
    (el) => ({
      value: el,
      label: el,
    }),
  );

  const onChangeRegion = (v: Option | null) => {
    setRegion(v);
  };

  const onChangeCity = (v: Option | null) => {
    setCity(v);
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^0-9]/g, "");

    if (numbers.length <= 3) {
      return numbers;
    }

    if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    }

    return `${numbers.slice(0, 3)}-${numbers.slice(
      3,
      7,
    )}-${numbers.slice(7, 11)}`;
  };

  const onChangeName = (v) => {
    setName(v);
  };

  const onClickSend = async () => {
    if (isLoading) return;

    setIsLoading(true);

    if (!name.trim()) {
      setNameError(true);
      alert("이름을 입력해주세요.");
      setIsLoading(false);
      nameRef.current?.focus();
      return;
    }

    if (!phone.trim()) {
      setPhoneError(true);
      alert("연락처를 입력해주세요.");
      setIsLoading(false);
      phoneRef.current?.focus();
      return;
    }

    if (!isChecked) {
      alert("개인정보 수집에 동의해주세요.");
      setIsLoading(false);
      return;
    }
    const { error } = await supabase.functions.invoke("send-consultation-sms", {
      body: {
        name,
        phone,
        region: region?.value,
        city: city?.value,
        contents,
      },
    });

    if (error) {
      alert("상담 신청에 실패했습니다. 잠시 후 다시 시도해주세요.");
      setIsLoading(false);
      return;
    }
    alert("상담 신청이 접수되었습니다. 빠른 시일 내 연락드리겠습니다.");
    setIsLoading(false);
  };

  const onChangeContents = (v) => {
    setContents(v);
  };

  return (
    <>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            display: "flex",
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.34)",
            zIndex: 2,
            alignItems: "center",
            justifyContent: "center",
            fontSize: "clamp(20px, 5vw, 40px)",
            fontFamily: "EliceB",
            color: "#a7762e",
          }}
        >
          LOADING..
        </div>
      )}
      <div style={{ width: "80%", paddingTop: 70 }} ref={registRef}>
        <div
          style={{
            display: "flex",
            color: "black",
            fontSize: "clamp(20px, 3vw, 30px)",
            fontFamily: "EliceB",
          }}
        >
          상담신청
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: isRegColumn ? "column" : "row",
            justifyContent: "space-between",
            flex: 1,
            marginTop: 60,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: isRegColumn ? "column" : "row",
                alignItems: isRegColumn ? "start" : "center",
                marginRight: 20,
              }}
            >
              <div
                style={{
                  color: "black",
                  fontSize: "clamp(16px, 2vw, 20px)",
                  fontFamily: "EliceB",
                  minWidth: 50,
                  textAlign: "left",
                  display: "flex",
                }}
              >
                이름
                <div
                  style={{
                    color: "rgb(255, 81, 81)",
                  }}
                >
                  *
                </div>
              </div>
              <input
                ref={nameRef}
                style={{
                  background: "white",
                  width: "clamp(100px, 15vw, 120px)",
                  border: nameError
                    ? "1px solid rgb(255, 81, 81)"
                    : "1px solid black",
                  borderRadius: 5,
                  height: 40,
                  color: "black",
                  textAlign: "center",
                  fontSize: "clamp(16px, 2vw, 20px)",
                  marginLeft: isRegColumn ? 0 : 10,
                  marginTop: isRegColumn ? 10 : 0,
                }}
                value={name}
                onChange={(e) => {
                  if (e.target.value.trim()) {
                    setNameError(false);
                  }
                  onChangeName(e.target.value);
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: isRegColumn ? "column" : "row",
                alignItems: isRegColumn ? "start" : "center",
                marginRight: 20,
              }}
            >
              <div
                style={{
                  color: "black",
                  fontSize: "clamp(16px, 2vw, 20px)",
                  fontFamily: "EliceB",
                  textAlign: "left",
                  minWidth: 70,
                  display: "flex",
                }}
              >
                연락처<span style={{ color: "rgb(255, 81, 81)" }}>*</span>
              </div>
              <input
                ref={phoneRef}
                type={"tel"}
                style={{
                  background: "white",
                  width: "clamp(160px, 18vw, 200px)",
                  border: phoneError
                    ? "1px solid rgb(255, 81, 81)"
                    : "1px solid black",
                  borderRadius: 5,
                  height: 40,
                  color: "black",
                  textAlign: "center",
                  fontSize: "clamp(16px, 2vw, 20px)",
                  marginLeft: isRegColumn ? 0 : 10,
                  marginTop: isRegColumn ? 10 : 0,
                }}
                value={phone}
                onChange={(e) => {
                  if (e.target.value.trim()) {
                    setPhoneError(false);
                  }
                  setPhone(formatPhoneNumber(e.target.value));
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: isRegColumn ? "column" : "row",
              marginTop: isRegColumn ? 20 : 0,
              alignItems: isRegColumn ? "start" : "center",
            }}
          >
            <div
              style={{
                color: "black",
                fontSize: "clamp(16px, 2vw, 20px)",
                fontFamily: "EliceB",
                minWidth: 110,
                textAlign: "left",
                display: "flex",
              }}
            >
              서비스 지역 <span style={{ color: "rgb(255, 81, 81)" }}>*</span>
            </div>
            <div
              style={{
                display: "flex",
                marginLeft: isRegColumn ? 0 : 20,
                marginTop: isRegColumn ? 10 : 0,
              }}
            >
              <div style={{}}>
                <Select
                  options={regionOption}
                  placeholder={"바우처 유형을 선택해주세요"}
                  onChange={(v) => onChangeRegion(v)}
                  value={region}
                  styles={customStyles}
                />
              </div>
              <div style={{ marginLeft: 10 }}>
                <Select
                  options={cityOption}
                  placeholder={"바우처 유형을 선택해주세요"}
                  onChange={(v) => onChangeCity(v)}
                  value={city}
                  styles={customStyles}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            color: "black",
            fontSize: "clamp(16px, 2vw, 20px)",
            fontFamily: "EliceB",
            marginTop: 40,
          }}
        >
          상담내용 & 문의내용
        </div>

        <textarea
          style={{
            background: "white",
            width: "100%",
            color: "black",
            resize: "none",
            height: 200,
            marginTop: 20,
            fontSize: 15,
            fontFamily: "EliceL",
            padding: 20,
            borderRadius: 10,
            border: "1px solid gray",
          }}
          value={contents}
          onChange={(e) => onChangeContents(e.target.value)}
        />
        <div
          style={{
            display: "flex",
            marginTop: 20,
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "black",
              textAlign: "left",
              fontSize: "clamp(12px, 2vw, 16px)",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: isRegColumn ? "column" : "row",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div
                  style={{
                    color: "black",
                    fontSize: "clamp(12px, 2vw, 16px)",
                  }}
                >
                  개인정보 수집 및 이용에 대해 동의합니다.
                </div>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  style={{
                    width: 20,
                    height: 20,
                    accentColor: "#70B1FB",
                    backgroundColor: "white",
                    colorScheme: "light",
                    marginLeft: 20,
                    cursor: "pointer",
                  }}
                />
              </div>

              <div
                style={{
                  borderRadius: 5,
                  padding: 15,
                  minWidth: 120,
                  background: isHover ? "#8a6020" : "#a7762e",
                  color: "white",
                  cursor: "pointer",
                  textAlign: "center",
                  marginTop: isRegColumn ? 10 : 0,
                }}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                onClick={() => onClickSend()}
              >
                {isLoading ? "전송중.." : "전송하기"}
              </div>
            </div>
            <div style={{ fontSize: "clamp(9px, 1vw, 14px)", marginTop: 10 }}>
              주식회사 포근은 아래와 같이 개인정보를 수집하고 있습니다.
              <br />
              1. 수집 개인정보 항목: 이름, 연락처, 출산예정일, 출산 경험 등
              개인정보
              <br />
              2. 개인정보의 수집 및 이용목적: 문의내용에 대한 확인 및 신속하고
              정확한 상담(오류해결 등), 고객불만 발생시 해결
              <br /> 3. 개인정보의 이용기간: 수집된 정보는 서비스 이용기간 동안
              보관하며, 이 외의 다른 목적으로 사용되지 않습니다.
              <br /> 4. 그 밖의 사항은 개인정보취급방침을 준수합니다.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationScreen;
