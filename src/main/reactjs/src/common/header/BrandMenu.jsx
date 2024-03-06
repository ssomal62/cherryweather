import React from "react";
import logo from "../../assets/images/brand/cw3.png";

import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  NavbarItem,
} from "@nextui-org/react";
import { ChevronDown } from "./Icons";
import { WiDaySunny } from "react-icons/wi";
import styled from "styled-components";
import teamCherry from "./../../assets/images/brand/cherry.png";
import { PiCrownSimpleBold } from "react-icons/pi";
const BrandMenu = () => {
  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
  };

  const weather_icons = {
    sunny: <WiDaySunny style={{ color: "pink", width: 30, height: 30 }} />,
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
            <Image width={180} alt="logo" src={logo} />
          </Button>
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        color="danger"
        variant="bordered"
        aria-label="ACME features"
        className="w-[300px]"
        itemClasses={{
          base: "gap-4",
        }}
      >
        <DropdownItem
          key="menu7"
          className="flex justify-center items-center"
          description="TeamCherry Member's"
        >
          <div className="flex justify-center items-center w-full h-full">
            <img src={teamCherry} alt="logo" className="w-1/2 mx-auto" />
          </div>
        </DropdownItem>
        <DropdownItem key="menu2">
          <div className="flexflex-row items-center">
            <div className="flex gap-2 items-center">
              <Avatar
                color="danger"
                showFallback
                alt="김주영"
                className="flex-shrink-0"
                size="md"
                src="https://ffkv1pqc2354.edge.naverncp.com/p5Rq2SwoqV/user/%EC%A3%BC%EC%98%81%EC%9D%B4(%EC%9E%A0%EB%A7%8C%EB%B3%B4).jpg?type=f&w=600&h=600&ttype=jpg"
              />
              <div className="flex flex-col">
                <span className="text-small">김주영</span>
                <span className="text-tiny text-default-400">
                  zkfltm7777@gmail.com
                </span>
                <span className="text-tiny text-default-400">
                  여러분들과 함께한 시간 너무 즐거웠어요!
                </span>
              </div>
            </div>
          </div>
        </DropdownItem>
        <DropdownItem key="menu3">
          <div className="flexflex-row items-center">
            <div className="flex gap-2 items-center">
              <Avatar
                color="danger"
                showFallback
                alt="김요한"
                className="flex-shrink-0"
                size="md"
                src="https://ffkv1pqc2354.edge.naverncp.com/p5Rq2SwoqV/user/1000000343.jpg?type=f&w=600&h=600&ttype=jpg"
              />
              <div className="flex flex-col">
                <span className="text-small">김요한</span>
                <span className="text-tiny text-default-400">
                  rladygks1210@naver.com
                </span>
                <span className="text-tiny text-default-400">
                  안녕! 그리고 수고했어 모두들!
                </span>
              </div>
            </div>
          </div>
        </DropdownItem>
        <DropdownItem key="menu4">
          <div className="flexflex-row items-center">
            <div className="flex gap-2 items-center">
              <Avatar
                color="danger"
                showFallback
                alt="박병철"
                className="flex-shrink-0"
                size="md"
                src="https://ffkv1pqc2354.edge.naverncp.com/p5Rq2SwoqV/user/IMG_7104.jpg?type=f&w=600&h=600&ttype=jpg"
              />
              <div className="flex flex-col">
                <span className="text-small">박병철</span>
                <span className="text-tiny text-default-400">
                  bbqcb@naver.com
                </span>
                <span className="text-tiny text-default-400">
                  수고하셨습니다 즐거웠어요
                </span>
              </div>
            </div>
          </div>
        </DropdownItem>
        <DropdownItem key="menu5">
          <div className="flexflex-row items-center">
            <div className="flex gap-2 items-center">
              <Avatar
                color="danger"
                showFallback
                alt="신영훈"
                className="flex-shrink-0"
                size="md"
                src="https://ffkv1pqc2354.edge.naverncp.com/p5Rq2SwoqV/user/image%20(1).png?type=f&w=600&h=600&ttype=jpg"
              />
              <div className="flex flex-col">
                <span className="text-small">신영훈</span>
                <span className="text-tiny text-default-400">
                  youngsh92@gmail.com
                </span>
                <span className="text-tiny text-default-400">
                  체리야 즐거웠어 !
                </span>
              </div>
            </div>
          </div>
        </DropdownItem>
        <DropdownItem key="menu6">
          <div className="flexflex-row items-center">
            <div className="flex gap-2 items-center">
              <Avatar
                color="danger"
                showFallback
                alt="윤현호"
                className="flex-shrink-0"
                size="md"
                src="https://ffkv1pqc2354.edge.naverncp.com/p5Rq2SwoqV/user/%EC%9D%B4%EB%A0%A5%EC%84%9C%20%EC%82%AC%EC%A7%84.jpg?type=f&w=600&h=600&ttype=jpg"
              />
              <div className="flex flex-col">
                <span className="text-small">윤현호</span>
                <span className="text-tiny text-default-400">
                  dbsgusgh2004@naver.com
                </span>
                <span className="text-tiny text-default-400">
                  여러분 수료 축하드립니다. 모두 취뽀 !!
                </span>
              </div>
            </div>
          </div>
        </DropdownItem>
        <DropdownItem key="menu1">
          <div className="flexflex-row items-center">
            <div className="flex gap-2 items-center">
              <Badge content={<PiCrownSimpleBold />} color="primary">
                <Avatar
                  color="danger"
                  showFallback
                  alt={"이소연"}
                  className="flex-shrink-0"
                  size="md"
                  src="https://ffkv1pqc2354.edge.naverncp.com/p5Rq2SwoqV/user/Screenshot_20230828_134221_Gallery.jpg?type=f&w=600&h=600&ttype=jpg"
                />
              </Badge>
              <div className="flex flex-col">
                <span className="text-small">이소연</span>
                <span className="text-tiny text-default-400">
                  wxy890@gmail.com
                </span>
                <span className="text-tiny text-default-400">
                  OverPowerwhelming
                </span>
              </div>
            </div>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default BrandMenu;
