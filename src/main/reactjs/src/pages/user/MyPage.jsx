import React from 'react';
import styled from 'styled-components';
import {IoArrowBack} from 'react-icons/io5';
import {LuSettings} from "react-icons/lu";
import Profile from '../../components/mypage/Profile';
import Footer from '../../common/footer/Footer';
import MyClub from '../../components/mypage/MyClub';
import MyPickClub from '../../components/mypage/MyPickClub';
import MyPageMenu from '../../components/mypage/MyPageMenu';
import {useNavigate} from 'react-router-dom';
import {joinedMembershipState, useMembershipData} from "../../recoil/hooks/UseMembershipApi";
import {Divider, Spinner} from "@nextui-org/react";
import {useRecoilValue} from "recoil";
import {likedClubListState, useClubData} from "../../recoil/hooks/UseClubApi";

const Mypage = () => {

    const navigate = useNavigate();

    const {loading: loadingJoinedMembership} = useMembershipData({
        state      : joinedMembershipState,
        dynamicPath: "/my-memberships",
    })

    const {loading: loadingLikedClubList} = useClubData({
        state      : likedClubListState,
        dynamicPath: "/liked",
    })

    const joinedClubs = useRecoilValue(joinedMembershipState).summaryList;
    const likedClubs = useRecoilValue(likedClubListState);

    const loading = loadingJoinedMembership || loadingLikedClubList;

    if (loading) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <Spinner size="lg" color="danger"/>
            </div>
        );
    }

    return (
        <div style={styles.bgColor}>
            <Nav style={{zIndex:'40', backgroundColor: '#ED145F'}}>
                <div className="flex flex-col w-full">
                    <div className='flex flex-row justify-between items-center pt-2 mb-2'>
                        <div className='justify-start'>
                            <IoArrowBack style={{width: 30, height: 30, color: 'white'}} onClick={() => navigate("/")}/>
                        </div>
                        <div className='justify-center' style={styles.title}>마이페이지</div>
                        <div className='justify-end'>
                            <IconWapper onClick={() => navigate("/mypage/setting")}><SettingsIcon style={{color:'white'}}/></IconWapper>
                        </div>
                    </div>
                    <Divider style={{maxWidth: '600px', margin: 'auto'}}/>
                </div>
            </Nav>

            <Container>
                <Profile/>
                <MyClub joinedClubs={joinedClubs}/>
                <MyPickClub likedClubs={likedClubs}/>
                <MyPageMenu/>
            </Container>
            <Footer/>
        </div>
    );
};

export default Mypage;

export const Container = styled.div`
  margin: auto;
  padding: 10px 0 48px;
  padding-bottom: calc(env(safe-area-inset-bottom) + 48px);
  max-width: 600px;
  display: block;
`;

const SettingsIcon = styled(LuSettings)`
  display: -ms-flexbox;
  display: flex;
  margin: 0 0 0 auto;
  position: relative;
  width: 24px;
  height: 24px;
`;

export const IconWapper = styled.div`
  text-align: right;
  flex: 1;
`;

export const Title = styled.div`
  font-weight: 700;
  font-size: 17px;
  line-height: 20px;
`;

export const TitleWapper = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  flex: 2;
`;


export const Nav = styled.div`
  height: 52px;
  display: -ms-flexbox;
  display: flex;
  background-color: white;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0 12px;
  box-sizing: border-box;
  z-index: 1;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  max-width: 600px;
  margin: auto;
`;

const styles = {
    title: {
        fontSize  : '18px',
        fontWeight: '600',
        color:'white',
    },
    bgColor: {
        height: '50vh',
        backgroundColor: '#ED145F',
        maxWidth:'600px',
        margin:'auto',
        borderBottomLeftRadius: '20px',
        borderBottomRightRadius: '20px',
    },
}
