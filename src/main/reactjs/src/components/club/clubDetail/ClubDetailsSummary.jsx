import React from 'react';
import {TiLocation} from "react-icons/ti";
import {MdOutlineFeed} from "react-icons/md";
import {BsFillPeopleFill} from "react-icons/bs";
import {IoChatbubbleEllipses} from "react-icons/io5";
import styled from "styled-components";

const ClubDetailsSummary = ({clubDetail}) => {
    return (
        <Section>
            <TiLocation></TiLocation>
            <span>{clubDetail.activitiesArea}</span>
            <MdOutlineFeed/>
            <span>{clubDetail.feedCount}&nbsp;피드</span>
            <BsFillPeopleFill/>
            <span>{clubDetail.currentMembers} / {clubDetail.maxMembers}</span>
            <IoChatbubbleEllipses/>
            <span>{clubDetail.lastChatTime} </span>
        </Section>
    );
};

export default ClubDetailsSummary;

const Section = styled.div`
  padding: 5%;
  display: flex;
  align-items: center;
  font-size: small;
  color: #7492DE;
  gap: 10px;
`;
