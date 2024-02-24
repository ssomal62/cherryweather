import React from 'react';
import {Chip} from "@nextui-org/react";
import styled from "styled-components";
import categoryDescriptions from './category.json'

const ClubCategory = ({clubDetail}) => {
    return (
        <Section>
            <Chip color='default' style={styles.chip}>
                {categoryDescriptions[clubDetail.category]}
            </Chip>/&nbsp;&nbsp;
            <Chip color='danger' style={styles.chip}>{clubDetail.subCategory}</Chip>
        </Section>
    );
};

export default ClubCategory;

const Section = styled.div`
  padding: 5%;
  display: block;
`;

const styles = {
    chip       : {
        marginRight: 10,
    },
}
