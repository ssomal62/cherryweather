import React, {useState} from 'react';
import styled from "styled-components";
import {IoIosArrowForward} from "react-icons/io";
import {Spinner, Tab, Tabs} from "@nextui-org/react";
import EventSearchResult from "./EventSearchResult";
import ClubSearchResult from "./ClubSearchResult";
import {clubListState, useClubData} from "../../../recoil/hooks/UseClubApi";
import {useRecoilValue} from "recoil";

const SearchResult = ({requestData}) => {

    const [selected, setSelected] = useState("club");

    const {loading: loadingClubData} =
        useClubData({
            method:'post',
            state: clubListState,
            dynamicPath: '/query',
            requestBody: requestData
        });

    const loading = loadingClubData;
    const clubList = useRecoilValue(clubListState);


    if (loading) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
                <Spinner size="lg" color="danger"/>
            </div>
        );
    }

    const tabs = [
        { id: "club", label: "클럽" },
        { id: "event", label: "정모" },
    ];

    const renderComponent = () => {
        switch(selected) {
            case 'club':
                return <ClubSearchResult clubList={clubList}/>;
            case 'event':
                return <EventSearchResult />;
        }
    };

    const handleTabChange = (value) => {
        setSelected(value);
    };

    return (
        <Section>
            <div className="flex items-center justify-between" style={styles.font}>
                <div className="flex items-center">
                    <IoIosArrowForward className="mr-2"/>
                    <p className="text-md font-bold"><span style={{color:"#F31260"}}>{requestData.keyword}</span> 검색 결과</p>
                </div>
            </div>

            <Tabs
                variant="solid"
                aria-label="Options"
                fullWidth
                size="md"
                className="mb-5"
                selectedKey={selected}
                items={tabs}
                onSelectionChange={handleTabChange}
            >
                {(item) => (
                    <Tab key={item.id} title={item.label} value={item.id} style={styles.title} />
                )}
            </Tabs>
            {renderComponent()}
        </Section>
    );
};

export default SearchResult;

const Section = styled.div
`
    padding: 0 20px 0 20px;
`

const styles = {
    font: {
        color       : 'black',
        marginBottom: '5%',
    },
}
