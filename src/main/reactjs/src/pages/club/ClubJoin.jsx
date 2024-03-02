import React from 'react';
import Layout from "../../common/Layout";
import AnimationRightInWrapper from "../../utils/animations/AnimationRightInWrapper";
import {GoCheckCircleFill} from "react-icons/go";
import {Button} from "@nextui-org/react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {clubDetailState} from "../../recoil/hooks/UseClubApi";
import {useRecoilValue} from "recoil";
import {
    currentClubMembershipInfoState,
    currentMembershipState,
    useMembershipData
} from "../../recoil/hooks/UseMembershipApi";

const ClubJoin = () => {

    const clubDetail = useRecoilValue(clubDetailState).clubDetail;

    useMembershipData({ state: currentClubMembershipInfoState, dynamicPath:`/${clubDetail.clubId}/memberships`});
    useMembershipData({ state: currentMembershipState, dynamicPath:`/${clubDetail.clubId}/member`});

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
                                onPress={() => navigate(`/club-details/${clubDetail.clubId}`)}>
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
                                onPress={() => navigate(`/club-members/${clubDetail.clubId}`)}>
                            멤버 목록 확인하기
                        </Button>
                    </ButtonSection>
                    <ButtonSection>
                        <Button fullWidth size='lg' variant='flat' color='default'
                                onPress={() => navigate('/')}>
                            홈으로 가기
                        </Button>
                    </ButtonSection>

                    {/*<ButtonSection>*/}
                    {/*    <small className="text-default-500">✅ 유의사항 : 이런 행동은 안돼요!</small>*/}
                    {/*</ButtonSection>*/}
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
  max-width: 600px;
  width: 100%;
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
