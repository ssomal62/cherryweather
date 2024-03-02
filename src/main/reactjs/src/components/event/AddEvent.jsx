import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
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
import Layout from "../../common/Layout";
import { instance } from "../../recoil/module/instance";
import { v4 as uuidv4 } from "uuid";

const AddEvent = ({ clubId }) => {
  const navi = useNavigate();
  const [eventName, setEventName] = useState("");
  const [eventContent, setEventContent] = useState("");
  const [eventStart, setEventStart] = useState("");
  const [eventImage, setEventImage] = useState(null);
  const [eventDate, setEventDate] = useState(new Date());
  const [eventLocation, setEventLocation] = useState("");
  const [eventCapacity, setEventCapacity] = useState("");
  const [code, setCode] = useState("");
  // const [eventWeather, setEventWeather] = useState("");
  const [calendarVisible, setCalendarVisible] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure("");
  const [fileSelected, setFileSelected] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (
      fileSelected &&
      fileInputRef.current &&
      fileInputRef.current.files.length > 0
    ) {
      const file = fileInputRef.current.files[0];
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setEventImage(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  }, [fileSelected]); // 파일 선택 상태가 변경될 때마다 useEffect 실행

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const fileReader = new FileReader();

      fileReader.onloadend = () => {
        // 데이터 URL을 상태에 저장합니다.
        setEventImage(fileReader.result);
        // 파일 선택 상태를 true로 설정하여 사용자가 이미지를 변경할 수 있도록 합니다.
        setFileSelected(true);
      };

      fileReader.readAsDataURL(file);

      const shortUUID = generateShortUUID();
      setCode("ep-" + shortUUID);

      // 파일 입력을 초기화합니다. 동일한 파일을 다시 선택할 수 있습니다.
      fileInputRef.current.value = null;
    } else {
      // 파일이 선택되지 않았을 경우, fileSelected를 false로 설정합니다.
      setFileSelected(false);
    }
  };

  const generateShortUUID = () => {
    const uuid = uuidv4();
    const uuidWithoutHyphen = uuid.replace(/-/g, "");
    return uuidWithoutHyphen.substring(0, 7);
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

  const createEvent = async () => {
    try {
      const config = {
        clubId: 14,
        eventSubject: eventName,
        eventContent: eventContent,
        code: code,
        eventEndDate: eventDate,
        eventTimeStart: eventStart,
        activitiesArea: eventLocation,
        eventCapacity: eventCapacity,
        // eventWeather: eventWeather,
      };

      const res = await instance.post("/events/create", config);
      console.log("리스폰스 데이터", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout useHeader={false} useFooter={false} containerPadding="0">
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
      <div style={{ marginBottom: "50px" }}>
        {eventImage ? (
          <img
            src={eventImage}
            style={{ width: "100%", maxHeight: "200px" }}
            onClick={() => fileInputRef.current.click()}
          />
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
          </label>
        )}
        <div
          style={{
            textAlign: "center",
          }}
        >
          <Span>정모 대표 이미지를 등록해주세요</Span>
        </div>
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileChange}
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
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <Span> 정모 주소를 입력해주세요 </Span>
      </div>
      <div
        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
        style={{ marginBottom: "10px" }}
      >
        <div onClick={openInterestAreaModal}>
          <Input
            type="text"
            value={eventLocation}
            startContent={<TiStarOutline style={{ ...styles.icon }} />}
            placeholder="정모 지역"
            onChange={(e) => setEventLocation(e.target.value)}
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
          onChange={(e) => setEventDate(e.target.value)}
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
      <div>
        <Span> 정모 시간을 입력해주세요 </Span>
      </div>
      <div
        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
        style={{ marginBottom: "10px" }}
      >
        <Input
          name="eventTimeStart"
          type="time"
          variant="underlined"
          radius="lg"
          value={eventStart}
          onChange={(e) => setEventStart(e.target.value)}
        />
      </div>
      <div>
        <Span> 정모 정원을 입력해주세요 </Span>
      </div>
      <div
        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
        style={{ marginBottom: "10px" }}
      >
        <Input
          name="eventTimeStart"
          type="number"
          variant="underlined"
          radius="lg"
          min={1}
          max={100}
          value={eventCapacity}
          onChange={(e) => setEventCapacity(e.target.value)}
        />
      </div>
      <div>
        <Span> 정모 내용을 입력해주세요 </Span>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Textarea
          name="eventContent"
          type="text"
          variant="underlined"
          value={eventContent}
          onChange={(e) => setEventContent(e.target.value)}
        ></Textarea>
      </div>

      <br />
      <br />
      <div className="bottom-0 left-0 right-0">
        <CreateButton onClick={createEvent} />
      </div>
    </Layout>
  );
};

export default AddEvent;

export const Span = styled.span`
  font-size: 18px;
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
const CreateButton = () => {
  return (
    <Button variant="ghost" fullWidth size="lg" color="danger">
      생성
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
