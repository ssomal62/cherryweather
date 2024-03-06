import { Card, CardBody, Image, Chip, Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { instance } from "../../recoil/module/instance";
import { useNavigate } from "react-router-dom";
import { GoPeople } from "react-icons/go";
import { TbCurrentLocation } from "react-icons/tb";
import { FaRegCalendarCheck } from "react-icons/fa";
const EventListItem = ({ event }) => {
  const [eventDetail, setEventDetail] = useState([]);

  const getEventDetail = async () => {
    try {
      const response = await instance.get(`/events/detail/${event.eventId}`);
      setEventDetail(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getEventDetail();
  }, []);
  const navi = useNavigate();
  const formatTime = (dateTime) => {
    const date = new Date(dateTime);
    // 기본 형식 설정
    let options = {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedDate = date.toLocaleString("ko-KR", options);

    // "월"과 "일" 사이, "일"과 "시간" 사이의 공백 정리
    let result = formattedDate.replace("월 ", "월 ").replace("일 ", "일 ");

    // "시"와 "분" 사이에 콜론(:)을 기준으로 분리하고, 필요한 조건에 따라 포맷 조정
    result = result.replace(/(\d+):(\d+)/, (match, p1, p2) => {
      // "분"이 "00"일 경우 "시"만 표시하고, 그 외에는 "시 분" 형태로 표시
      return p2 === "00" ? `${p1}시` : `${p1}시 ${p2}분`;
    });

    return result;
  };
  return (
    <Card isBlurred className="border-none max-w-[600px]" shadow="sm">
      <CardBody onClick={() => navi(`/club-details/${eventDetail.clubId}`)}>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              alt="Album cover"
              maxHeight="200px"
              src={`https://ffkv1pqc2354.edge.naverncp.com/p5Rq2SwoqV/event-profile/${eventDetail.code}.jpg?type=f&w=600&h=600&ttype=jpg`}
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0 ">
                <div className="flex items-center">
                  <span
                    className="flex mt-2 ml-2 mb-2
                    font-bold text-2xl"
                  >
                    {eventDetail.eventSubject}
                  </span>
                </div>
                <div className="flex items-center">
                  <span
                    className="flex mt-2 ml-2 mb-4"
                    style={{ color: "gray" }}
                  >
                    {eventDetail.eventContent}
                  </span>
                </div>
                <Divider />
                <div className="ml-2 flex justify-between mt-2">
                  <span
                    className="flex mt-2"
                    style={{
                      color: "gray",
                    }}
                  >
                    <GoPeople
                      className="mr-2"
                      style={{ fontSize: 25, textAlign: "center" }}
                    />
                    <p>
                      {eventDetail.eventCountCurrent} /{" "}
                      {eventDetail.eventCapacity}
                    </p>
                  </span>

                  <span
                    className="flex mt-2"
                    style={{
                      color: "gray",
                    }}
                  >
                    <TbCurrentLocation
                      className="mr-2"
                      style={{ fontSize: 25, textAlign: "center" }}
                    />
                    <p className="mr-2">{eventDetail.activitiesArea}</p>
                  </span>
                </div>

                <div className="ml-2 flex justify-between items-center">
                  <span
                    className="flex mt-2"
                    style={{
                      color: "gray",
                    }}
                  >
                    <FaRegCalendarCheck
                      className="mr-2"
                      style={{ fontSize: 25, textAlign: "center" }}
                    />
                    <p
                      style={{
                        color: "#FF1291",
                      }}
                    >
                      {formatTime(eventDetail.eventTimeStart)}
                    </p>
                  </span>
                  <Image
                    src="https://kr.object.ncloudstorage.com/cherry-weather/weather/icon/clear.svg"
                    alt="image"
                    color="none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default EventListItem;
