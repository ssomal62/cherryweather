import React from "react";
import styled from "styled-components";
import {Card, CardBody, Chip, Image} from "@nextui-org/react";
import {Swiper, SwiperSlide} from "swiper/react";
import {useLocation, useNavigate} from "react-router-dom";
import {CgScrollH} from "react-icons/cg";

const MyClub = ({joinedClubs}) => {

    const navigate = useNavigate();
    const location = useLocation();
    const handlePageChange = (clubId) => {
        sessionStorage.setItem('scrollPosition', window.scrollY);
        navigate(`/club-details/${clubId}`, { state: { from: location.pathname } });
    }

    const clubProfile = (code) => {
        return `https://ffkv1pqc2354.edge.naverncp.com/p5Rq2SwoqV/club-profile/${code ? code : "default"}.jpg?type=f&w=600&h=600&ttype=jpg`
    }

    return (
        <Container>
            <Card>
                <CardBody className="overflow-x-hidden">
                    <div className="flex flex-row justify-center items-start">
                        <div className="justify-start gap-1">
                    <Chip size="sm" color="danger" variant="bordered" className="mb-2">가입한 클럽</Chip>
                        </div>
                        <div className="justify-end ml-auto mr-2">
                            <CgScrollH style={{width:24, height:24, color :'#F31260'}}/>
                        </div>
                    </div>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={'auto'}
                        // slidesOffsetAfter={50}
                    >
                        {joinedClubs.map((joinedClub, index) => (
                            <SwiperSlide key={index} className="max-w-[5em]">
                                <div className="flex flex-col ">
                                    <Image
                                        src={clubProfile(joinedClub.clubSummary.code)}
                                        alt="Club Profile"
                                        radius="lg"
                                        style={{width: '5em', height: '5em', border: '1px solid #d7d7d7',cursor:'pointer'}}
                                        onClick={() => handlePageChange(joinedClub.clubSummary.clubId)}
                                    />
                                </div>
                                <div className="flex justify-center items-center">
                                    <p className="text-small" style={{color:'gray'}}>{joinedClub.clubSummary.name}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </CardBody>
            </Card>
        </Container>
    );
};

export default MyClub;

const Title = styled.div`
  margin: 0 10px 0 0;
  color: #212224;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 21px;
  letter-spacing: 0;
`;

const Container = styled.div`
  padding: 20px;
`;
