import React, { useState } from "react";
import styled from "styled-components";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Nav, Title, TitleWapper } from "../../pages/user/MyPage";
import { IoArrowBack } from "react-icons/io5";
import { IconWapper } from "../auth/SignInMain";
import { useNavigate } from "react-router-dom";
import { CiImageOn } from "react-icons/ci";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { RxCalendar } from "react-icons/rx";
import { TiStarOutline } from "react-icons/ti";
import DaumPostcodeEmbed from "react-daum-postcode";

const AddEvent = () => {
  const navi = useNavigate();
  const [eventImage, setEventImage] = useState(null);
  const [eventDate, setEventDate] = useState(new Date());
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [eventLocation, setEventLocation] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure("");
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setEventImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const prevStep = () => {
    // 뒤로 가기
    navi("/club");
  };

  const calModal = () => {
    // 달력 아이콘 클릭 하면 Calendar 나오도록 코드 작성
    // 예시로는 아래와 같이 모달을 사용하여 달력을 표시합니다.
    setCalendarVisible(!calendarVisible);
  };

  const openInterestAreaModal = () => {
    setEventLocation();
    onOpen();
  };

  const completeAddress = (data) => {
    const fullAddress = data.sido + " " + data.sigungu;
    setEventLocation(fullAddress);
    onOpenChange();
  };

  return (
    <div>
      <Nav>
        <div style={{ flex: "1px" }}>
          <IoArrowBack
            style={{ width: 30, height: 30, color: "black" }}
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
      {/* 이미지 업로드 input */}
      <div style={{ marginBottom: "50px" }}>
        {eventImage ? (
          <img src={eventImage} style={{ width: "100%", maxHeight: "500px" }} />
        ) : (
          <label htmlFor="file" style={{ display: "block", width: "100%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ marginBottom: "5px", textAlign: "center" }}>
                <CiImageOn style={{ fontSize: "120px", display: "block" }} />
              </div>
            </div>
            <Span
              style={{
                marginTop: "10px",
                textAlign: "center",
                marginLeft: "55px",
              }}
            >
              정모 대표 이미지를 등록해주세요
            </Span>
          </label>
        )}
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
      </div>

      <div>
        <Span> 정모 이름을 입력해주세요 </Span>
      </div>
      <div
        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
        style={{ marginBottom: "10px" }}
      >
        <Input
          name="eventName"
          type="text"
          variant="underlined"
          radius="lg"
          // value={eventName}
          // onChange={onChange}
          style={{ fontSize: 20, fontWeight: 600 }}
        />
      </div>
      <div>
        <Span> 정모 주소를 입력해주세요 </Span>
      </div>
      <div
        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
        style={{ marginBottom: "10px" }}
      >
        <div onClick={openInterestAreaModal}>
          <Input
            style={{ width: "340px", fontSize: 20, fontWeight: 600 }}
            type="text"
            value={eventLocation}
            startContent={<TiStarOutline style={{ ...styles.icon }} />}
            placeholder="정모 지역"
          />
        </div>
        <Modal
          isOpen={isOpen}
          placement="bottom-center"
          onOpenChange={onOpenChange}
          className="max-w"
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">지역 조회</ModalHeader>
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
      <div style={{ marginBottom: "5px" }}>
        <Span style={{ display: "flex", alignItems: "center" }}>
          정모 날짜를 입력해주세요
          <RxCalendar
            style={{ marginLeft: "5px", fontSize: "30px" }}
            onClick={calModal}
          />
        </Span>
      </div>
      <div
        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
        style={{ marginBottom: "10px" }}
      >
        <Input
          name="eventDate"
          type="text"
          variant="underlined"
          radius="lg"
          value={eventDate.toLocaleDateString("ko", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
          // onChange={setEventDate}
          style={{ fontSize: 20, fontWeight: 600 }}
        />

        {calendarVisible && (
          <div className="calendar-modal">
            <StyledCalendarWrapper>
              <Calendar
                value={eventDate}
                onChange={setEventDate}
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
          </div>
        )}
      </div>
      <br />
      <br />
      <div className="bottom-0 left-0 right-0">
        <CreateButton text="생성" />
      </div>
    </div>
  );
};

export default AddEvent;

export const Span = styled.span`
  font-size: 20px;
  font-weight: 600;
`;
export const StyledCalendarWrapper = styled.div`
  position: absolute;
  z-index: 100;
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
  overflow-y: auto;
  max-height: 300px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 0.5rem;
  .react-calendar__tile--now {
    background: orange;
    abbr {
      color: ${(props) => props.theme.primary_2};
    }
  }
`;
const CreateButton = ({ text }) => {
  return (
    <Button variant="ghost" fullWidth size="lg" color="danger">
      {text}
    </Button>
  );
};

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
