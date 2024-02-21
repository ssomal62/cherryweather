import React, {useState} from "react";
import {Input, Navbar, NavbarContent, NavbarItem} from "@nextui-org/react";
import {IoArrowBack} from "react-icons/io5";
import {useNavigate} from 'react-router-dom';
import {SearchIcon} from '../../../assets/icon/SearchIcon'
import {IoIosClose} from "react-icons/io";

export default function ClubSearchHeader({setKeywords}) {

    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleInputKeyword = (e) => {
        if (e.key === 'Enter') {
            setKeywords(keywords => [inputValue, ...keywords]);
            setInputValue('');
        }
    };

    return (
        <Navbar>
            <NavbarContent justify="start">
                <NavbarItem
                    style={styles.iconBox}
                    onClick={() => navigate(-1)}
                >
                    <IoArrowBack style={styles.icon}/>
                </NavbarItem>
                <NavbarItem justify="end" style={styles.title} className="max-w-full">
                    <Input
                        startContent={<SearchIcon style={styles.icon}/>}
                        endContent={<IoIosClose style={styles.endIcon} onClick={() => setInputValue('')}/>}
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleInputKeyword}
                        radius="full"
                        placeholder="마른 하늘에 오징어볼"

                    />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}

const styles = {
    iconBox: {
        borderRadius   : 50,
        transition     : 'background-color 0.3s ease, backdrop-filter 0.5s ease, -webkit-backdrop-filter 0.5s ease',
        width          : 30,
        height         : 30,
        alignItems     : 'center',
        display        : 'flex',
        justifyContent : 'center',
        cursor         : 'pointer',
    },
    icon   : {
        width     : 24,
        height    : 24,
        color     : 'black',
    },
    endIcon   : {
        width     : 20,
        height    : 20,
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
