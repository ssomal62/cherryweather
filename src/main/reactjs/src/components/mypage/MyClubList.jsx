import React, {useEffect} from "react";
import {Container, IconWapper, Nav,} from "../../pages/user/MyPage";
import {IoArrowBack} from "react-icons/io5";
import {HiOutlineHome} from "react-icons/hi2";
import styled from "styled-components";
import {Button, Chip, Divider, Image, Listbox, ListboxItem, ListboxSection, Spinner} from "@nextui-org/react";
import {myClubListState, useClubData} from "../../recoil/hooks/UseClubApi";
import {useRecoilValue} from "recoil";
import {useLocation, useNavigate} from "react-router-dom";
import {GrFormNext} from "react-icons/gr";
import {LuAlertCircle} from "react-icons/lu";
import categoryDescriptions from "../club/clubDetail/category.json";
import {useFetchUserInfo, userInfoState} from "../../recoil/hooks/UseFetchUserInfo";

const MyClubList = () => {

    const {loading: loadingMyClubList} = useClubData({state: myClubListState, dynamicPath: "/myClub"});

    const myClubs = useRecoilValue(myClubListState);
    const navigate = useNavigate();
    const location = useLocation();
    const clubProfile = (code) => {
        return `https://ffkv1pqc2354.edge.naverncp.com/p5Rq2SwoqV/club-profile/${code ? code : "default"}.jpg?type=f&w=600&h=600&ttype=jpg`
    }

    if (loadingMyClubList) {
        return (
            <>
                <Nav>
                    <div style={{flex: "1px"}}>
                        <IoArrowBack
                            style={{width: 30, height: 30, color: "black"}}
                            onClick={() => navigate(-1)}
                        />
                    </div>
                    <div style={styles.title}>내가 만든 클럽</div>
                    <IconWapper onClick={() => navigate("/")}>
                        <HomeIcon/>
                    </IconWapper>
                </Nav>
                <Container>
                    <div style={styles.noData}><Spinner size="lg" color="danger"/></div>
                </Container>
            </>)
    }


    return (
        <>
            <Nav>
                <div style={{flex: "1px"}}>
                    <IoArrowBack
                        style={{width: 30, height: 30, color: "black"}}
                        onClick={() => navigate("/")}
                    />
                </div>
                <div style={styles.title}>내가 만든 클럽</div>
                <IconWapper>
                </IconWapper>
            </Nav>
            <Divider style={{maxWidth: '600px', margin: 'auto'}}/>

            {myClubs.length !== 0 ?
                (<Container style={{marginTop: 20, padding: 20}}>

                    <Listbox
                             aria-label="User Menu"
                             color="danger"
                             variant="flat"
                             className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[600px] overflow-visible shadow-small rounded-medium"
                             itemClasses={{
                                 base: "px-3 py-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-5 h-15 data-[hover=true]:bg-default-100/80",
                             }}
                    >
                        {
                            myClubs?.map((club, index) => (
                                    <ListboxItem
                                        showDivider={(myClubs.length - 1) === index ? false : true}
                                        key={index}
                                        startContent={
                                            <Image className="bg-success/10 text-success" width='60px'
                                                   src={clubProfile(club.code)}/>
                                        }
                                        onClick={() => navigate(`/club-details/${club.clubId}`, {state: {from: location.pathname}})}
                                    >

                                        <div className='flex flex-row justify-between items-center'>
                                            <p className='flex flex-col justify-start gap-1'>
                                                <Chip size='sm' color='secondary'
                                                      variant='flat'>{categoryDescriptions[club.category]}</Chip>
                                                <div style={{fontSize: '1.1em', fontWeight: '600'}}> {club.name}</div>
                                            </p>

                                            <div
                                                className='justify-end'>
                                                <GrFormNext/>
                                            </div>
                                        </div>
                                    </ListboxItem>
                            ))
                        }

                    </Listbox>

                </Container>)
                :
                (
                    <Container>
                        <div style={styles.noData}><LuAlertCircle/>&nbsp;아직 클럽이 없네요!
                            <Button variant="light" color="danger"
                                    onClick={() => navigate('/club-add')}
                            ><u>클럽 만들기</u></Button></div>

                    </Container>
                )
            }

        </>
    );
};

export default MyClubList;

const styles = {
    title : {
        fontSize  : '18px',
        fontWeight: '600',
    },
    noData: {
        color         : 'gray',
        fontSize      : 'small',
        display       : 'flex',
        justifyContent: 'center',
        alignItems    : 'center',
        height        : '50vh',
        width         : '100%',
    }
}


const HomeIcon = styled(HiOutlineHome)`
  display: -ms-flexbox;
  display: flex;
  margin: 0 0 0 auto;
  position: relative;
  width: 24px;
  height: 24px;
`;
