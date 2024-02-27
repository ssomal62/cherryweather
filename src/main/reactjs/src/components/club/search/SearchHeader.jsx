import React from "react";
import {Input, Navbar, NavbarContent, NavbarItem} from "@nextui-org/react";
import {IoArrowBack} from "react-icons/io5";
import {SearchIcon} from '../../../assets/icon/SearchIcon'
import {IoIosClose} from "react-icons/io";
import weatherPhrases from './WeatherPlaceholder.json'
import {useSetRecoilState} from "recoil";
import {searchClubListState} from "../../../recoil/hooks/UseClubApi";

export default function SearchHeader({ handleSearch, setInputValue, inputValue, handleBack, setSearchTriggered}) {

    const handleInputChange = (e) => setInputValue(e.target.value);
    const setSearchState = useSetRecoilState(searchClubListState);
    const handleInputEnter = (e) => {
        if (e.key === 'Enter') {
            setSearchState([]);
            localStorage.removeItem('searchResult');
            localStorage.removeItem('searchTriggered');
            handleSearch(inputValue);
            if (inputValue.trim() === '') {
                setSearchTriggered(false);
            }
        }
    };

    const handleClearInput = () => {
        setInputValue('');
        handleSearch('');
        setSearchTriggered(false);
    };

    const todayWeather = "비";

    const todayWeatherActivities = weatherPhrases[todayWeather].activities;
    const todayWeatherIcon = weatherPhrases[todayWeather].icon;
    const todayActivity = todayWeatherActivities[Math.floor(Math.random() * todayWeatherActivities.length)];
    const todayPlaceholder = `     ${todayWeatherIcon} ${todayActivity}`;

    return (
        <Navbar>
            <NavbarContent justify="start">
                <NavbarItem
                    onClick={handleBack}
                >
                    <IoArrowBack style={styles.icon}/>
                </NavbarItem>
                <NavbarItem justify="end" style={styles.title} className="max-w-full">
                    <Input
                        startContent={<SearchIcon style={styles.icon}/>}
                        endContent={<IoIosClose style={styles.endIcon} onClick={handleClearInput}/>}
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleInputEnter}
                        radius="full"
                        placeholder={todayPlaceholder}
                    />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}

const styles = {
    icon   : {
        width     : 24,
        height    : 24,
        color     : 'black',
    },
    endIcon   : {
        width     : '20px',
        height    : '20px',
        backgroundColor : 'gray',
        borderRadius: 50,
        color     : 'white',
        cursor : 'pointer',
    },
    title   : {
        fontWeight: 600,
        fontSize  : 20,
        flex:1,
    }
};
