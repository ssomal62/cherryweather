import React, {useEffect, useState} from "react";
import {Button, Navbar, NavbarContent, NavbarItem} from "@nextui-org/react";
import {IoArrowBack} from "react-icons/io5";
import {GoPencil, GoPeople} from "react-icons/go";
import {useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import MemberVerificationModal from "../../../utils/MemberVerificationModal";
import {currentMembershipState} from "../../../recoil/hooks/UseMembershipApi";
import {IsLoginAtom} from "../../../recoil/LoginAtom";
import {PiChatCircleDots} from "react-icons/pi";

export default function ClubFeedHeader({clubId}) {
    const isLogin = useRecoilValue(IsLoginAtom);
    const navigate = useNavigate();
    const myMembership = useRecoilValue(currentMembershipState);

    const [scrolled, setScrolled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 150) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    const styles = {
        navBar : {
            maxWidth            : '600px',
            width               : '100%',
            backgroundColor     : scrolled ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0)',
            backdropFilter      : scrolled ? 'blur(10px)' : 'blur(0px)',
            WebkitBackdropFilter: scrolled ? 'blur(10px)' : 'blur(0px)',
            position            : 'fixed',
            display             : 'flex',
            justifyContent      : 'center',
            margin              : 'auto',
            transition          : 'background-color 0.3s ease, backdrop-filter 0.5s ease, -webkit-backdrop-filter 0.5s ease',
            boxShadow           : scrolled ? '0 20px 20px 0 rgba(0, 0, 0, 0.03)' : '0 0px 0px 0 rgba(0, 0, 0, 0)'
        },
        icon   : {
            width     : 24,
            height    : 24,
            color     : 'black',
            transition: 'color 0.3s ease, backdrop-filter 0.5s ease, -webkit-backdrop-filter 0.5s ease',
        },
        text   : {
            fontWeight: 600,
            fontSize  : 20,
            display   : 'block',
        }
    };

    return (
        <>
            <Navbar style={styles.navBar}>
                <NavbarContent justify="start">
                    <NavbarItem>
                        <Button
                            isIconOnly
                            variant="light"
                            onPress={()=>navigate(`/club-details/${clubId}`)}
                            startContent={<IoArrowBack style={styles.icon}/>}
                        >
                        </Button>
                    </NavbarItem>
                    <NavbarItem style={styles.text}>
                       피드
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent className="items-center" justify="end">
                    <NavbarItem>
                        <Button
                            isIconOnly
                            variant="light"
                            onPress={()=>navigate('/feed-editor')}
                            startContent={ <GoPencil style={styles.icon}/>}
                        >
                        </Button>
                    </NavbarItem>
                    <NavbarItem>
                        <Button
                            isIconOnly
                            variant="light"
                            startContent={<PiChatCircleDots style={styles.icon}/>}
                        >
                        </Button>
                    </NavbarItem>
                    <NavbarItem>
                        <Button
                            isIconOnly
                            variant="light"
                            onPress={()=>navigate(`/club-details/${clubId}`)}
                            startContent={<GoPeople style={styles.icon}/>}
                            >
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            <MemberVerificationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        </>
    );
}


