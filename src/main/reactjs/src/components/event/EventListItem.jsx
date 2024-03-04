import { Card, CardBody, Image, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { instance } from "../../recoil/module/instance";

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
  console.log("이벤트 디테일: ", eventDetail);
  useEffect(() => {
    getEventDetail();
  }, []);
  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[600px]"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              alt="Album cover"
              height={200}
              shadow="md"
              src={`https://ffkv1pqc2354.edge.naverncp.com/p5Rq2SwoqV/event-profile/${eventDetail.code}.jpg?type=f&w=600&h=600&ttype=jpg`}
              width="100%"
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <h3 className="font-semibold text-foreground/90">
                  {eventDetail.eventSubject}
                </h3>
                <p className="text-small text-foreground/80">
                  {eventDetail.eventCountCurrent}/{eventDetail.eventCapacity}
                </p>
                <h1 className="text-large font-medium mt-2">
                  {eventDetail.eventContent}
                </h1>
              </div>
              <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                radius="full"
                variant="light"
              >
                dddd
              </Button>
            </div>

            <div className="flex flex-col mt-3 gap-1">
              <div className="flex justify-between"></div>
            </div>

            <div className="flex w-full items-center justify-center">
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              ></Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              ></Button>
              <Button
                isIconOnly
                className="w-auto h-auto data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              ></Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              ></Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              ></Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default EventListItem;
