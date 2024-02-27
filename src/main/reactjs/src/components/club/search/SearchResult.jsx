import React, {useState} from 'react';
import styled from "styled-components";
import {IoIosArrowForward} from "react-icons/io";
import {Tab, Tabs} from "@nextui-org/react";
import EventSearchResult from "./EventSearchResult";
import ClubSearchResult from "./ClubSearchResult";
import {useRecoilValue} from "recoil";
import {searchClubListState} from "../../../recoil/hooks/UseClubApi";

const SearchResult = () => {

    const [selected, setSelected] = useState("club");

    const searchClubList = useRecoilValue(searchClubListState);

    const tabs = [
        { id: "club", label: "클럽" },
        { id: "event", label: "정모" },
    ];

    const renderComponent = () => {
        switch(selected) {
            case 'event':
                return <EventSearchResult />;
            case 'club':
            default:
                return <ClubSearchResult clubList={searchClubList}/>;
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
                    <p className="text-md font-bold"><span style={{color:"#F31260"}}>{JSON.parse(localStorage.getItem('searchResult'))}</span> 검색 결과</p>
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
