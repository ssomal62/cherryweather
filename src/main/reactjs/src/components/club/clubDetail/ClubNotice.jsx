import React from 'react';
import {Card, CardBody, CardFooter, CardHeader, Divider, Image} from "@nextui-org/react";
import styled from "styled-components";

const ClubNotice = ({ clubDetail, hostProfile, hostName }) => {

    return (
        <Section>
            <Card>
                <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                        <p className="text-md font-bold">우리 모임의 규칙</p>
                    </div>
                </CardHeader>
                <Divider/>
                <CardBody>
                    <div style={{ whiteSpace: 'pre-wrap' }}>
                        {clubDetail.notice}
                    </div>
                </CardBody>
                <Divider/>
                <CardFooter className="flex gap-3">
                    <Image
                        alt="nextui logo"
                        height={40}
                        radius="sm"
                        src={`https://ffkv1pqc2354.edge.naverncp.com/p5Rq2SwoqV/user-profile/${hostProfile}?type=f&w=600&h=600&ttype=jpg`}
                        width={40}
                    />
                    <div className="flex flex-col">
                        <p className="text-small text-default-500">by 호스트 <b>@{hostName}</b></p>
                    </div>
                </CardFooter>
            </Card>
        </Section>
    );
};

export default ClubNotice;


const Section = styled.div`
  padding: 5%;
  display: block;
  color: gray;
  margin-top: 10%;
  margin-bottom: 10%;
  width: 100%;
`;
