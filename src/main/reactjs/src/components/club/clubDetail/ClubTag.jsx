import React from 'react';
import {IoIosArrowForward} from "react-icons/io";
import {Chip} from "@nextui-org/react";
import {FaHashtag} from "react-icons/fa";
import styled from "styled-components";

const ClubTag = ({clubDetail}) => {

    const tags = clubDetail.tag
        ? clubDetail.tag.split(/,\s*|\s+/)
        : [];

    return (
        <Section>
            <div className="flex items-center justify-between" style={styles.font}>
                <div className="flex items-center">
                    <IoIosArrowForward class="mr-2"/>
                    <p className="text-md font-bold mr-5">클럽 태그</p>
                </div>
            </div>
            <div className="flex items-center flex-wrap">
                {tags?.map((tagItem, index) => (
                    <Chip variant="bordered" color='default'
                          startContent={<FaHashtag className="mr-1"/>} key={index}
                          className="mr-2 mb-1"
                    >{tagItem}</Chip>
                ))}
            </div>
        </Section>
    );
};
export default ClubTag;

const Section = styled.div`
  padding: 5%;
  display: block;
  width: 100%;
`
const styles = {
    font       : {
        color       : '#F31260',
        marginBottom: '5%',
    },
}
