import React from 'react';
import Layout from '../../common/Layout';
import ClubList from "../../components/club/clubList/ClubList";
import ClubListHeader from "../../components/club/clubList/ClubListHeader";

const Club = () => {
    return (
        <Layout>
            <ClubListHeader/>
            <br/>
            <ClubList/>
        </Layout>
    );
};

export default Club;
