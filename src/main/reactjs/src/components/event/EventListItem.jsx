import { Card, CardBody, Image, Chip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { instance } from "../../recoil/module/instance";
import { useNavigate } from "react-router-dom";
import { GoPersonAdd } from "react-icons/go";
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
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };
  return (
    <Card isBlurred className="border-none max-w-[600px]" shadow="sm">
      <CardBody onClick={() => navi(`/club-details/${eventDetail.clubId}`)}>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center mb-10">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              alt="Album cover"
              maxHeight="200px"
              shadow="md"
              src={`https://ffkv1pqc2354.edge.naverncp.com/p5Rq2SwoqV/event-profile/${eventDetail.code}.jpg?type=f&w=600&h=600&ttype=jpg`}
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0 ">
                <Chip className="font-semibold text-foreground/90">
                  {eventDetail.eventSubject}{" "}
                </Chip>

                <Chip className="font-semibold text-foreground/90 mt-2">
                  {eventDetail.eventContent}
                </Chip>
                <Chip className="text-small font-medium mt-2">
                  <p className="text-small text-foreground/80 flex">
                    <GoPersonAdd
                      className="mr-2 flex"
                      style={{ fontSize: 20 }}
                    />
                    {eventDetail.eventCountCurrent}/{eventDetail.eventCapacity}
                  </p>
                </Chip>
                <Chip className="text-small font-medium mt-2">
                  <p className="text-small text-foreground/80 flex">
                    {eventDetail.eventEndDate} /{" "}
                    {formatTime(eventDetail.eventTimeStart)}{" "}
                    {eventDetail.activitiesArea}
                  </p>
                </Chip>
              </div>

              <Image
                src="https://kr.object.ncloudstorage.com/cherry-weather/weather/icon/clear.svg"
                alt="image"
                color="none"
              />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default EventListItem;
