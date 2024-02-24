import React from "react";
import {Navbar, NavbarContent, NavbarItem} from "@nextui-org/react";
import {IoArrowBack} from "react-icons/io5";
import {useNavigate} from 'react-router-dom';

export default function ClubConfigurationHeader({clubDetail}) {

    const navigate = useNavigate();

    return (
        <Navbar>
            <NavbarContent justify="start">
                <NavbarItem
                    style={styles.iconBox}
                    onClick={() => navigate(`/club-details/${clubDetail.clubId}`)}
                >
                    <IoArrowBack style={styles.icon}/>
                </NavbarItem>
                <NavbarItem  style={styles.title}>
                    클럽 설정
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
        height    : 25,
        color     : 'black',
        transition: 'color 0.3s ease, backdrop-filter 0.5s ease, -webkit-backdrop-filter 0.5s ease',
    },
    title   : {
        fontWeight: 600,
        fontSize  : 20,
    }
};
