import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import items from "./items.json";
import { Button, Spinner, user } from "@nextui-org/react";
import { LuCalendarCheck } from "react-icons/lu";
import { GoPeople } from "react-icons/go";
import { instance } from "../../../recoil/module/instance";
import { useRecoilValue } from "recoil";
import {
  useFetchUserInfo,
  userInfoState,
} from "../../../recoil/hooks/UseFetchUserInfo";
import { IsLoginAtom } from "../../../recoil/LoginAtom";
import { currentMembershipState } from "../../../recoil/hooks/UseMembershipApi";
import MemberVerificationModal from "../../../utils/MemberVerificationModal";
import JoinEventModal from "../../../utils/JoinEventModal";

const SwiperCardSection = ({ clubDetail }) => {
  const isLogin = useRecoilValue(IsLoginAtom);
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchUserInfo = useFetchUserInfo(); // 이렇게 훅을 호출해야 합니다.
  const myMembership = useRecoilValue(currentMembershipState);
  const userInfo = useRecoilValue(userInfoState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    if (isLogin) {
      fetchUserInfo(); // 로그인 상태일 때 사용자 정보를 불러옵니다.
    }
  }, [isLogin]);

  useEffect(() => {
    const getEventDetails = async () => {
      setLoading(true);
      try {
        // 전체 이벤트 리스트 가져오기
        const clubDetailList = await instance.get(
          `/events/${clubDetail.clubId}`
        );
        console.log("clubDetailList", clubDetailList);
        setEventList(clubDetailList.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getEventDetails();
  }, []);

  // 이벤트 가입
  const joinEvent = async (eventId) => {
    try {
      // 사용자 인증 정보나 멤버십 정보 확인 코드 추가

      if (!isLogin || !myMembership || myMembership.info.role === "WAITING") {
        setIsModalOpen(true);
        return;
      }
      const response = await instance.post(`/events/memberships/${eventId}`, {
        eventId: eventId,
        accountId: userInfo.accountId,
      });
      console.log("참여 성공", response.data);
      setIsSuccessModalOpen(true);
      // 성공적으로 참여했을 때의 처리 로직
    } catch (error) {
      console.error("참여 실패", error);
      // 참여에 실패했을 때의 처리 로직
    }
  };

  const formatTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Spinner size="lg" color="danger" />
      </div>
    );
  }
  return (
    <section className="game-section">
      <Swiper
        spaceBetween={30}
        slidesPerView={"auto"}
        // centeredSlides={true}
        // centeredSlidesBounds={true}
        slidesOffsetBefore={25}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {eventList?.map((item, index) => (
          <SwiperSlide
            key={index}
            style={{
              ...styles.itemStyle,
              backgroundImage: `url(https://ffkv1pqc2354.edge.naverncp.com/p5Rq2SwoqV/event-profile/${item.code}.jpg?type=f&w=600&h=600&ttype=jpg)`,
            }}
          >
            <div style={styles.gradientLayer}></div>
            <div className="absolute z-10 item-desc" style={styles.title}>
              {item.eventSubject}
            </div>
            <div className="absolute z-10 item-desc" style={styles.content}>
              <div className="flex items-center gap-2">
                <LuCalendarCheck /> {item.eventEndDate} :{" "}
                {formatTime(item.eventTimeStart)}{" "}
              </div>
              <div className="flex items-center gap-2">
                <GoPeople /> {item.eventCountCurrent}/{item.eventCapacity}
              </div>
            </div>
            <Button
              size="md"
              radius="lg"
              color="success"
              variant="bordered"
              className="absolute flex z-20"
              onClick={() => joinEvent(item.eventId)}
            >
              참여하기
            </Button>
          </SwiperSlide>
        ))}
      </Swiper>
      <MemberVerificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <JoinEventModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </section>
  );
};

export default SwiperCardSection;

const styles = {
  title: {
    fontWeight: 600,
    fontSize: "large",
    color: "white",
    marginBottom: 100,
  },
  content: {
    color: "white",
    fontSize: "small",
    marginBottom: 50,
  },
  itemStyle: {
    width: "50%",
    padding: "5%",
    height: "30vh",
    display: "flex",
    alignItems: "flex-end",
    background: "#343434 no-repeat center center / cover",
    borderRadius: "16px",
    overflow: "hidden",
    position: "relative",
    transition: "all 0.4s ease-in-out",
    cursor: "pointer",
  },
  gradientLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage:
      "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.1))",
    zIndex: 2,
  },
};
