import React, {useEffect, useState} from 'react';
import Layout from "../../common/Layout";
import {useNavigate, useParams} from "react-router-dom";
import SoftCurveTop from "../../components/club/clubDetail/SoftCurveTop";
import {IoIosArrowForward} from "react-icons/io";

import {Card, CardBody, CardFooter, CardHeader, Chip, Divider, Image} from "@nextui-org/react";
import styled from "styled-components";
import ClubDetailsHeader from "../../components/club/clubDetail/ClubDetailsHeader";
import {TiLocation} from "react-icons/ti";
import {BsFillPeopleFill} from "react-icons/bs";
import {MdOutlineFeed} from "react-icons/md";
import {IoChatbubbleEllipses} from "react-icons/io5";
import AvatarArea from "../../components/club/clubDetail/AvatarArea";
import SwiperCardSection from "../../components/club/clubDetail/SwiperCardSection";
import {clubDetailState, useClubDetailState} from "../../recoil/hooks/UseClubDetailState";
import {useRecoilValue} from "recoil";
import ClubJoinButton from "../../components/club/clubDetail/ClubJoinButton";
import FeedCards from "../../components/club/clubDetail/FeedCards";
import {useMembersState} from "../../recoil/hooks/UseMembersState";
import {isMemberState, useCheckMember} from "../../recoil/hooks/CheckIsMember";

const ClubDetails = () => {

    const { clubId } = useParams();
    const navigate = useNavigate();
    const [showButton, setShowButton] = useState(false);

    useCheckMember(clubId);
    useClubDetailState(clubId);
    useMembersState(clubId);


    const club = useRecoilValue(clubDetailState);
    const isMember = useRecoilValue(isMemberState);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [offsetY, setOffsetY] = useState(0);

    const clubProfile = (code) => {
        return `https://ffkv1pqc2354.edge.naverncp.com/p5Rq2SwoqV/club-profile/${code}.jpg?type=f&w=600&h=600&ttype=jpg`
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowButton(true);
        }, 300);
        return () => clearTimeout(timer);
    }, []);


    useEffect(() => {
        let lastScrollY = 0;
        let ticking = false;

        const handleScroll = () => {
            lastScrollY = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setOffsetY(lastScrollY);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Layout useHeader={false} useFooter={false} containerMargin="0" containerPadding="0">
            <ClubDetailsHeader/>
            <ClubDetail>
                <div style={styles.aspectRatio}>

                    <Content>
                        <ChipArea>
                            <Chip color='default' style={styles.chip}>{club.category}</Chip>/&nbsp;&nbsp;
                            <Chip color='danger' style={styles.chip}>{club.subCategory}</Chip>
                        </ChipArea>
                        <ClubNameArea>
                            {club.name}
                        </ClubNameArea>
                        <ClubInfo>
                            <TiLocation></TiLocation>
                            <span>{club.activitiesArea}</span>
                            <MdOutlineFeed/>
                            <span>15피드</span>
                            <BsFillPeopleFill/>
                            <span>{club.currentMembers} / {club.maxMembers}</span>
                            <IoChatbubbleEllipses/>
                            <span>30분 전</span>
                        </ClubInfo>
                        <EventTitle>
                            <div className="flex items-center justify-between" style={styles.font}>
                                <div className="flex items-center">
                                    <IoIosArrowForward class="mr-2"/>
                                    <p className="text-md font-bold">모임 참여해요!</p>
                                </div>
                                <Chip
                                    size='sm' variant='flat' color='primary'
                                    style={{cursor:'pointer'}}
                                    className="text-md text-tiny item-end">
                                    모두 보기</Chip>
                            </div>

                        </EventTitle>
                        <EventList>
                            <SwiperCardSection/>
                        </EventList>

                        <ClubDescription>
                            <Card>
                                <CardHeader className="flex gap-3">
                                    <div className="flex flex-col">
                                        <p className="text-md font-bold">우리 모임의 규칙</p>
                                    </div>
                                </CardHeader>
                                <Divider/>
                                <CardBody>
                                    <div style={{ whiteSpace: 'pre-wrap' }}>
                                        {club.notice}
                                    </div>
                                </CardBody>
                                <Divider/>
                                <CardFooter className="flex gap-3">
                                    <Image
                                        alt="nextui logo"
                                        height={40}
                                        radius="sm"
                                        src={''}
                                        width={40}
                                    />
                                    <div className="flex flex-col">
                                        <p className="text-small text-default-500">by 호스트 <b>@cherry</b></p>
                                    </div>
                                </CardFooter>
                            </Card>
                        </ClubDescription>
                        <MemberList>
                            <div className="flex items-center justify-between" style={styles.font}>
                                <div className="flex items-center">
                                    <IoIosArrowForward class="mr-2"/>
                                    <p className="text-md font-bold">가입 멤버</p>
                                </div>
                                <Chip size='sm' variant='flat' color='primary'
                                      style={{cursor:'pointer'}}
                                      onClick={() => navigate('/club-members')}
                                      className="text-md text-tiny item-end">
                                    모두 보기
                                </Chip>
                            </div>
                            <div className="flex items-center">
                                <AvatarArea />
                            </div>
                        </MemberList>
                        <ClubFeed>
                            <div className="flex items-center justify-between" style={styles.font}>
                                <div className="flex items-center">
                                    <IoIosArrowForward class="mr-2"/>
                                    <p className="text-md font-bold">모임 후기</p>
                                </div>
                                <Chip
                                    size='sm' variant='flat' color='primary'
                                    style={{cursor:'pointer'}}
                                    className="text-md text-tiny item-end">
                                    모두 보기</Chip>
                            </div>
                            <FeedCards/>
                        </ClubFeed>
                    </Content>

                    <Image radius='none' alt=""
                           removeWrapper
                           style={{
                               ...styles.img,
                               transform: `translateY(${offsetY * -0.3}px)`,
                           }}
                           className="w-full object-cover object-middle"
                           src={clubProfile(club.code)}
                    />

                    <div style={styles.top}>
                        <SoftCurveTop color={'#ffffff'}/>
                    </div>
                </div>
            </ClubDetail>

            {showButton &&  <div><ClubJoinButton isMember={isMember} /></div>}

        </Layout>
    );
};

export default ClubDetails;

const bd = '0px solid aquamarine';

const EventList = styled.div`
  border: ${bd};
  display: block;
  left: 0;
`;

const EventTitle = styled.div`
  padding-right: 5%;
  padding-left: 5%;
  padding-top: 5%;
  border: ${bd};
  display: block;
  width: 100%;
`;

const ClubFeed = styled.div`
  padding: 5%;
  border: ${bd};
  display: block;
  width: 100%;
`;

const MemberList = styled.div`
  padding: 5%;
  border: ${bd};
  display: block;
  margin-bottom: 10%;
  width: 100%;
`;

const ClubDescription = styled.div`
  padding: 5%;
  border: ${bd};
  display: block;
  color: gray;
  margin-top: 10%;
  margin-bottom: 10%;
  width: 100%;
`;

const ChipArea = styled.div`
  padding: 5%;
  border: ${bd};
  display: block;
`;

const ClubNameArea = styled.div`
  padding-right: 5%;
  padding-left: 5%;
  border: ${bd};
  font-weight: 800;
  font-size: xx-large;
  display: block;
`;

const ClubInfo = styled.div`
  padding: 5%;
  border: ${bd};
  display: flex;
  align-items: center;
  font-size: small;
  color: #7492DE;
  gap: 10px;
`;

const Content = styled.div`
  border: ${bd};
  position: absolute;
  justify-content: center;
  top: 0;
  margin-top: 69%;
  left: 0;
  max-width: 600px;
  width: 100%;
  z-index: 30;
  display: flex;
  flex-direction: column;
`;

const ClubDetail = styled.div`
  width: 100%;
  min-height: 650%;
  background-image: linear-gradient(to bottom, #ffffff, #ffffff, #CFD8F2, #ffffff);
`;

const styles = {
    aspectRatio: {
        position  : 'relative',
        width     : '100%',
        paddingTop: '90%',
    },
    img        : {
        position : 'absolute',
        top      : 0,
        left     : 0,
        width    : '100%',
        height   : '100%',
        //maskImage: 'linear-gradient(to top, transparent, black)',
    },
    chip       : {
        marginRight: 10,
    },
    infoIcon   : {
        color: '#F31260',
    },
    font       : {
        color       : '#F31260',
        marginBottom: '5%',
    },
    top        : {
        position  : 'absolute',
        top       : '0',
        width     : '100%',
        height    : '100%',
        paddingTop: '50%',
        zIndex    : '10',
    }
}
