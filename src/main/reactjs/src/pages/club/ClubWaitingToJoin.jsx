import React from 'react';
import Layout from "../../common/Layout";
import AnimationRightInWrapper from "../../utils/animations/AnimationRightInWrapper";
import {TbClockPlus} from "react-icons/tb";
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

const ClubWaitingToJoin = () => {

    const clubDetail = useRecoilValue(clubDetailState).clubDetail;

    useMembershipData({ state: currentClubMembershipInfoState, dynamicPath:`/${clubDetail.clubId}/memberships`});
    useMembershipData({ state: currentMembershipState, dynamicPath:`/${clubDetail.clubId}/member`});

    const navigate = useNavigate();

    return (
        <Layout useFooter={false} useHeader={false} containerPadding="0">
            <AnimationRightInWrapper>
                <section style={styles.top}>
                    <TbClockPlus style={styles.icon}/>

                    <span style={styles.title}>클럽 가입 신청 완료</span>
                    <br/>
                    <span>호스트가 가입 승인을 하면 알려드려요!</span>
                </section>

                <ParentContainer>
                    <ButtonSection>
                        <Button fullWidth size='lg' variant='flat' color='success'
                                onPress={() => navigate(`/club-details/${clubDetail.clubId}`)}>
                            클럽 메인
                        </Button>
                    </ButtonSection>
                    <ButtonSection>
                        <Button fullWidth size='lg' variant='flat' color='default'
                                onPress={() => navigate('/community/clubs')}>
                            클럽 목록
                        </Button>
                    </ButtonSection>
                    <ButtonSection>
                        <Button fullWidth size='lg' variant='flat' color='default'
                                onPress={() => navigate('/')}>
                            홈으로 가기
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

export default ClubWaitingToJoin;

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
