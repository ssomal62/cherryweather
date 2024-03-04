import React, { useEffect, useState } from "react";
import { instance } from "../../recoil/module/instance";
import EventListItem from "./EventListItem";
import styled from "styled-components";
import { Spinner } from "@nextui-org/react";

const EventList = () => {
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getEventList = async () => {
    try {
      const response = await instance.get("/events/list");
      setEventList(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getEventList();
  }, []);

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
    <div>
      {eventList.map((event, index) => (
        <EventWrapper key={index}>
          <EventListItem event={event} />
        </EventWrapper>
      ))}
    </div>
  );
};

export default EventList;
const EventWrapper = styled.div`
  margin-bottom: 25px;
`;
