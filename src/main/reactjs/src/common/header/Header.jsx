import React, {useEffect} from 'react';
import {IoOptionsOutline, IoSearchOutline} from "react-icons/io5";
import {GoBell} from "react-icons/go";
import {Input, Navbar, NavbarContent, Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";
import {SearchIcon} from "./SearchIcon";
import BrandMenu from "./BrandMenu";
import AvatarMenu from "./AvatarMenu";

export default function Header() {

    const [isOpen, setIsOpen] = React.useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsOpen(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Navbar shouldHideOnScroll>

            <NavbarContent className="sm:flex gap-4 " justify="start">
                <BrandMenu/>
            </NavbarContent>

            <NavbarContent as="div" className="items-center" justify="end">
                <IoOptionsOutline style={styles.icon}/>

                <Popover backdrop='opaque' placement="bottom-end" isOpen={isOpen}
                         onOpenChange={(open) => setIsOpen(open)}>
                    <PopoverTrigger>
                        <div><IoSearchOutline style={styles.icon}/></div>
                    </PopoverTrigger>
                    <PopoverContent>
                        <Input
                            classNames={{
                                base        : "max-w-full sm:max-w-[10rem] h-10",
                                mainWrapper : "h-full",
                                input       : "text-small",
                                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                            }}
                            placeholder="검색"
                            size="sm"
                            startContent={<SearchIcon size={18}/>}
                            type="search"
                        />
                    </PopoverContent>
                </Popover>

                <GoBell style={styles.icon}/>
                <AvatarMenu/>
            </NavbarContent>
        </Navbar>
    );
};

const styles = {
    block: {
        marginRight    : 10,
        marginTop      : 15,
        marginBottom   : 15,
    },
    nav  : {
        display       : 'flex',
        justifyContent: 'flex-end',
        alignItems    : 'center'
    },
    icon : {
        width      : 22,
        height     : 22,
        color      : 'black',
        marginRight: 3,
    }
};
