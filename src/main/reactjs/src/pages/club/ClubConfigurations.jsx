import React from 'react';
import Layout from "../../common/Layout";
import styled from "styled-components";
import AnimationRightInWrapper from "../../utils/animations/AnimationRightInWrapper";
import {Chip, Divider} from "@nextui-org/react";
import ClubConfigurationHeader from "../../components/club/clubConfigurations/ClubConfigurationHeader";
import {IoIosArrowForward} from "react-icons/io";
import {useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {clubDetailState} from "../../recoil/hooks/UseClubDetailState";

const ClubConfigurations = () => {


    const navigate = useNavigate();
    const club = useRecoilValue(clubDetailState);
    return (

        <Layout useHeader={false} useFooter={false} containerMargin="5" containerPadding="0">
            <AnimationRightInWrapper>
                <ClubConfigurationHeader/>
                <Divider/>

                <Section>
                    <Chip size='sm' color='default' variant='faded'> 클럽 정보 </Chip>
                    <div className="flex items-center justify-between" style={styles.font}
                         onClick={()=> navigate(`/club-add/${club.clubId}`)}
                    >
                        <div className="flex items-center">
                            <p>클럽 수정하기</p>
                        </div>
                        <div className="flex items-end">
                            <IoIosArrowForward/>
                        </div>
                    </div>
                </Section>
                <Divider/>
                <Section>
                    <Chip size='sm' color='default' variant='faded'> 클럽 활동 </Chip>
                    <div className="flex items-center justify-between" style={styles.font}
                        onClick={()=> navigate('/club-members')}
                    >
                        <div className="flex items-center">
                            <p>클럽 멤버관리</p>
                        </div>
                        <div className="flex items-end">
                            <IoIosArrowForward/>
                        </div>
                    </div>
                </Section>
                <Divider/>
                <Section>
                    <Chip size='sm' color='default' variant='faded'> 클럽 운영 </Chip>
                    <div className="flex items-center justify-between" style={styles.font}>
                        <div className="flex items-center">
                            <p>클럽 삭제</p>
                        </div>
                        <div className="flex items-end">
                            <IoIosArrowForward/>
                        </div>
                    </div>
                </Section>
            </AnimationRightInWrapper>
        </Layout>

    );
};

export default ClubConfigurations;

const styles = {
    font      : {
        color: 'black', margin: '5% 0 5% 2%',
        cursor: 'pointer',
    },
}
const bd = '0px solid aquamarine';

const Section = styled.div`
  padding-right: 5%;
  padding-left: 5%;
  padding-top: 5%;
  border: ${bd};
  display: block;
  width: 100%;
`;
