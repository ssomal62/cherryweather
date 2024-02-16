import React, { useEffect } from "react";
import Layout from "../common/Layout";
import WebNotificationTest from "../components/webnotification/WebNotificationTest";
import { useFetchUserInfo, userInfoState } from "../recoil/hooks/UseFetchUserInfo";
import { useRecoilValue } from "recoil";


const Home = () => {

    const fetchUserInfo = useFetchUserInfo();
    const userInfo = useRecoilValue(userInfoState)

    useEffect(() => {
        fetchUserInfo();
        console.log(userInfo);
    }, []);

    console.log(userInfo.accountId);
    console.log(userInfo.email);




    return (
        <Layout>
            <img alt="" src={require('../assets/images/brand/cw_test_img3.png')}
            style={{borderRadius:30}}/>

            <WebNotificationTest/>
        </Layout>
    );
};

export default Home;
