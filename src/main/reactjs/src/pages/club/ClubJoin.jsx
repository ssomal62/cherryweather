import React from 'react';
import Layout from "../../common/Layout";
import AnimationRightInWrapper from "../../utils/animations/AnimationRightInWrapper";
import {GoCheckCircleFill} from "react-icons/go";
import {Button} from "@nextui-org/react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {clubDetailState} from "../../recoil/hooks/UseClubDetailState";
import {useRecoilValue} from "recoil";
import {useMyMembership} from "../../recoil/hooks/UseMyMembership";

const ClubJoin = () => {

    const club = useRecoilValue(clubDetailState);
    useMyMembership();
    const navigate = useNavigate();

    return (
        <Layout useFooter={false} useHeader={false} containerPadding="0">
            <AnimationRightInWrapper>
                <section style={styles.top}>
                    <GoCheckCircleFill style={styles.icon}/>

                    <span style={styles.title}>클럽 가입 완료</span>
                    <br/>
                    <span>자, 무엇을 먼저 해볼까요?</span>
                </section>

                <ParentContainer>
                    <ButtonSection>
                        <Button fullWidth size='lg' variant='flat' color='success'
                                onPress={() => navigate(`/club-details/${club.clubId}`)}
                        >
                            클럽 메인
                        </Button>
                    </ButtonSection>
                    <ButtonSection>
                        <Button fullWidth size='lg' variant='flat' color='default'>
                            채팅방 입장하기
                        </Button>
                    </ButtonSection>
                    <ButtonSection>
                        <Button fullWidth size='lg' variant='flat' color='default'>
                            일정 보기
                        </Button>
                    </ButtonSection>
                    <ButtonSection>
                        <Button fullWidth size='lg' variant='flat' color='default'
                                //onPress={() => navigate(`/chat/room/${charRoom}`)}
                        >
                            멤버 목록 확인하기
                        </Button>
                    </ButtonSection>

                    <ButtonSection>
                        <small className="text-default-500">✅ 유의사항 : 이런 행동은 안돼요!</small>
                    </ButtonSection>
                </ParentContainer>
            </AnimationRightInWrapper>
        </Layout>
    );
};

export default ClubJoin;

const ParentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ButtonSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  margin: 10px auto;
`;

const styles = {

    icon : {
        width : 50,
        height: 50,
        color : '#36CF7D',
        margin: '30 0 20 0',
    },
    title: {
        fontSize  : 30,
        fontWeight: 800,
    },
    top  : {
        paddingBottom : 10,
        display       : 'flex',
        flexDirection : 'column',
        alignItems    : 'center',
        justifyContent: 'center',
        width         : '100%',
        height        : '100%',
    }
}
