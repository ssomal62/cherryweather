import React from "react";
import {Button, Navbar, NavbarContent, NavbarItem} from "@nextui-org/react";
import {IoArrowBack} from "react-icons/io5";
import {useNavigate} from 'react-router-dom';

export default function FeedEditorHeader({onSave}) {

    const navigate = useNavigate();

    const handleAddClick = () => {
        onSave();
        navigate("/");
    }

    return (

            <Navbar style={styles.navBar}>
                <NavbarContent justify="start">
                    <NavbarItem>
                        <Button
                            isIconOnly
                            variant="light"
                            onPress={()=>navigate(-1)}
                            startContent={<IoArrowBack style={styles.icon}/>}
                        >
                        </Button>
                    </NavbarItem>
                    <NavbarItem style={styles.title}>
                       &nbsp; 피드 쓰기
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent className="items-center" justify="end">
                    <NavbarItem>
                        <Button
                            variant="light"
                            color="danger"
                            onPress={handleAddClick}
                        > 올리기
                        </Button>
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
