import React from 'react';
import Layout from '../../common/Layout';
import ClubList from "../../components/club/clubList/ClubList";
import {useMyMembership} from "../../recoil/hooks/UseMyMembership";

const Club = () => {

    useMyMembership();

    return (
        <Layout>
            <ClubList/>
        </Layout>
    );
};

export default Club;

