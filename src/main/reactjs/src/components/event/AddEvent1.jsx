import { useRef, useState } from "react";
import Layout from "../../common/Layout";
import { Nav, TitleWapper } from "../../pages/user/MyPage";
import { IoArrowBack } from "react-icons/io5";
import { Title } from "../mypage/MyPageMenu";
import { IconWapper } from "../auth/SignInMain";
import { useNavigate } from "react-router-dom";
import { CiImageOn } from "react-icons/ci";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { TiStarOutline } from "react-icons/ti";
import DaumPostcodeEmbed from "react-daum-postcode";
import { RxCalendar } from "react-icons/rx";
import Calendar from "react-calendar";
import { StyledCalendarWrapper } from "./AddEvent";

const AddEvent1 = () => {
  const navi = useNavigate();
  const [eventData, setEventData] = useState({
    clubId: "",
    eventSubject: "",
    eventContent: "",
    code: "", // 고유 코드 저장을 위한 초기값 설정
    eventEndDate: "",
    eventTimeStart: "",
    eventStatus: "",
    activitiesArea: "",
    eventCapacity: "",
    eventWeather: "",
  });
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null); // 파일 입력을 위한 ref 생성
  const { isOpen, onOpen, onOpenChange } = useDisclosure("");
  const [eventEndDate, setEventEndDate] = useState(new Date());
  const [calendarVisible, setCalendarVisible] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const newCode = "ep-" + uuidv4();
      setPreview(URL.createObjectURL(file));
      setEventData((prevState) => ({
        ...prevState,
        code: newCode, // 고유 코드를 eventData에 저장
      }));
    } else {
      setPreview(null);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click(); // ref를 사용하여 input[type="file"] 클릭 트리거
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(eventData);
    // 서버로 데이터 전송 로직 구현
  };

  const openInterestAreaModal = () => {
    onOpen();
  };

  const completeAddress = (data) => {
    // 주소 데이터에서 필요한 부분을 추출 또는 조합합니다.
    const fullAddress = data.sido + " " + data.sigungu;

    // setEventData 함수를 사용하여 상태를 업데이트합니다.
    // 이전 상태를 유지하면서 activitiesArea만 새로운 값으로 설정합니다.
    setEventData((prevState) => ({
      ...prevState, // 이전 상태의 모든 값들을 유지합니다.
      activitiesArea: fullAddress, // activitiesArea를 새로운 주소로 업데이트합니다.
    }));

    // 모달 닫기 함수를 호출합니다.
    // 이 예시에서는 onOpenChange 함수가 모달의 열림/닫힘 상태를 토글하는 것으로 가정합니다.
    // 실제로 모달을 닫는 함수명이 다를 수 있으니, 사용하는 UI 라이브러리나 구현 방식에 맞게 조정해야 합니다.
    onOpenChange(); // 모달 닫기 함수 호출
  };

  // 캘린더 모달을 열기 위한 함수
  const calModal = () => {
    // 달력 아이콘 클릭 하면 Calendar 나오도록 코드 작성
    // 예시로는 아래와 같이 모달을 사용하여 달력을 표시합니다.
    setCalendarVisible(!calendarVisible);
  };

  const prevStep = () => {
    navi(-1);
  };
  return (
    <Layout useHeader={false} useFooter={false} containerPadding="0">
      <Nav>
        <div style={{ flex: "1px" }}>
          <IoArrowBack
            style={{ width: 20, height: 20, color: "black", cursor: "pointer" }}
            onClick={prevStep}
          />
        </div>

        <TitleWapper>
          <Title>정모 추가</Title>
        </TitleWapper>
        <IconWapper></IconWapper>
      </Nav>
      <div style={{ borderBottom: "1px solid black" }}></div>
      <br />
      <div style={{ marginBottom: "50px", alignItems: "center" }}>
        <div
          style={{
            marginBottom: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
          onClick={handleImageClick}
        >
          {!preview && (
            <CiImageOn style={{ fontSize: "120px", display: "block" }} />
          )}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{ width: "100%", height: "auto" }}
            />
          )}
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <Span>정모 대표 이미지를 등록해주세요</Span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <Span> 정모 이름을 입력해주세요 </Span>
        </div>
        <div
          className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
          style={{ marginBottom: "10px" }}
        >
          <Input
            name="eventSubject"
            type="text"
            variant="underlined"
            radius="lg"
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <Span> 정모 주소를 입력해주세요 </Span>
        </div>
        <div className="flex w-full" style={{ marginBottom: "10px" }}>
          <div
            onClick={openInterestAreaModal}
            style={{ width: "100%", marginBottom: "10px" }}
          >
            <Input
              name="activitiesArea"
              placeholder="정모 지역"
              value={eventData.activitiesArea}
              startContent={<TiStarOutline style={{ ...styles.icon }} />}
              readOnly
              style={{ cursor: "pointer" }}
              //   className="full-width"
            />
          </div>
          <Modal
            isOpen={isOpen}
            placement="center"
            className="max-w"
            onOpenChange={onOpenChange}
          >
            <ModalContent>
              <ModalHeader className="flex flex-col gap-1">
                지역 조회
              </ModalHeader>
              <ModalBody>
                <DaumPostcodeEmbed
                  autoClose
                  onComplete={completeAddress}
                  submitMode="false"
                  useBannerLink="false"
                  hideMapBtn="true"
                  hideEngBtn="true"
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <Span> 정모 내용을 입력해주세요 </Span>
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Textarea
            type="text"
            name="eventContent"
            variant="flat"
            radius="md"
            classNames={{
              base: "max-w-full",
              input: "resize-y min-h-[100px]",
            }}
            onChange={handleChange}
          ></Textarea>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <Span
            style={{ display: "flex", alignItems: "center" }}
            onClick={calModal}
          >
            정모 날짜를 입력해주세요
            <RxCalendar style={{ marginLeft: "5px", fontSize: "30px" }} />
          </Span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Input
            type="text"
            name="eventEndDate"
            value={eventEndDate.toLocaleDateString("ko", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
            readOnly
            style={{ cursor: "pointer" }}
          />
        </div>

        {/* 캘린더 모달 부분에서 선택된 날짜를 eventEndDate에 저장하는 로직 추가 */}
        {calendarVisible && (
          <StyledCalendarWrapper
            style={{
              position: "absolute",
              zIndex: 1000,
              top: "70%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Calendar
              value={eventEndDate}
              onChange={setEventEndDate} // 선택된 날짜를 eventEndDate에 저장
              formatDay={(locale, date) =>
                //xx일 -> xx 으로 format 변경
                new Date(date).toLocaleDateString("en-us", {
                  day: "2-digit",
                })
              }
              minDate={new Date()}
              next2Label={null} // +1년 & +10년 이동 버튼 숨기기
              prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
            />
          </StyledCalendarWrapper>
        )}
        <div className="form-group">
          <label>이벤트 시작시간</label>
          <input
            type="text"
            className="form-control"
            name="eventTimeStart"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>이벤트 상태</label>
          <input
            type="text"
            className="form-control"
            name="eventStatus"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>활동지역</label>
          <input
            type="text"
            className="form-control"
            name="activitiesArea"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>이벤트 수용인원</label>
          <input
            type="text"
            className="form-control"
            name="eventCapacity"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>이벤트 날씨</label>
          <input
            type="text"
            className="form-control"
            name="eventWeather"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          등록
        </button>
      </form>
    </Layout>
  );
};

export default AddEvent1;

export const Span = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

const styles = {
  description: {
    display: "flex",
    justifyContent: "left",
    color: "gray",
  },
  icon: {
    width: 24,
    height: 24,
  },
};
