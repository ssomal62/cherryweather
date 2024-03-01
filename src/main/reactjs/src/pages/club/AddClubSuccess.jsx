import React from 'react';
import Layout from "../../common/Layout";
import AnimationRightInWrapper from "../../utils/animations/AnimationRightInWrapper";
import {Button} from "@nextui-org/react";
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";
import {clubListState, useClubData} from "../../recoil/hooks/UseClubApi";

const AddClubSuccess = () => {

    const {clubId} = useParams();

    const celebratory = "https://kr.object.ncloudstorage.com/cherry-weather/brand/celebratory.gif";

    const navigate = useNavigate();
    useClubData({state: clubListState, dynamicPath: ""});

    return (
        <Layout useFooter={false} useHeader={false} containerMargin="0" containerPadding="0">
            <div>
                <img alt="" src={celebratory} style={styles.image}/>

                <div style={styles.block}>
                    <AnimationRightInWrapper>
                        <ParentContainer>
                            <section style={styles.top}>
                                <p style={styles.icon}>🥳</p>

                                <span style={styles.title}>클럽 생성되었어요!</span>
                                <br/>
                                <span>지금 바로 내 클럽을 확인해볼까요?</span>
                            </section>
                            <ButtonSection>
                                <Button fullWidth size='lg' variant='flat' color='success'
                                        onPress={() => navigate(`/club-details/${clubId}`)}>
                                    클럽 입장하기
                                </Button>
                            </ButtonSection>
                            <ButtonSection>
                                <Button fullWidth size='lg' variant='flat' color='default'
                                        onPress={() => navigate('/community/club')}>
                                    클럽 목록
                                </Button>
                            </ButtonSection>
                            <ButtonSection>
                                <Button fullWidth size='lg' variant='flat' color='default'
                                        onPress={() => navigate('/')}>
                                    홈으로 가기
                                </Button>
                            </ButtonSection>
                        </ParentContainer>
                    </AnimationRightInWrapper>
                </div>
            </div>
        </Layout>
    );
};

export default AddClubSuccess;

const ParentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
  justify-content: center;
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
        fontSize: 50,
        margin  : '30 0 20 0',
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
    },
    image: {
        position: 'absolute',
        top     : 0,
        maxWidth: '600px',
        width   : '100%',
    },
    block: {
        marginTop: '50%',
    }
}
