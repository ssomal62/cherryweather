import React from 'react';
import logo from '../../assets/images/brand/cw3.png'

import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Image,
    NavbarItem
} from "@nextui-org/react";
import {ChevronDown} from "./Icons";
import {WiDaySunny} from "react-icons/wi";

const BrandMenu = () => {

    const icons = {
        chevron: <ChevronDown fill="currentColor" size={16}/>,
    };

    const weather_icons = {
        sunny: <WiDaySunny style={{color: 'pink', width: 30, height: 30}}/>,
    };

    return (

        <Dropdown placement="bottom-start">
            <NavbarItem>
                <DropdownTrigger>
                    <Button
                        disableRipple
                        className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                        endContent={icons.chevron}
                        radius="sm"
                        variant="light"
                    >
                        <Image
                            width={180}
                            alt="logo"
                            src={logo}
                        />
                    </Button>
                </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
                aria-label="ACME features"
                className="w-[300px]"
                itemClasses={{
                    base: "gap-4",
                }}
            >
                <DropdownItem
                    key="menu1"
                    description="설명이 필요해?"
                    startContent={weather_icons.sunny}
                >
                    Autoscaling
                </DropdownItem>
                <DropdownItem
                    key="menu2"
                    startContent={weather_icons.sunny}
                >
                    Usage Metrics
                </DropdownItem>
                <DropdownItem
                    key="menu3"
                    startContent={weather_icons.sunny}
                >
                    Production Ready
                </DropdownItem>
                <DropdownItem
                    key="menu4"
                    startContent={weather_icons.sunny}
                >
                    +99% Uptime
                </DropdownItem>
                <DropdownItem
                    key="menu5"
                    startContent={weather_icons.sunny}
                >
                    +Supreme Support
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>

    );
};

export default BrandMenu;
