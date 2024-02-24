import React from 'react';
import styled from "styled-components";

const ClubName = ({clubDetail}) => {
    return (
        <Section>
            {clubDetail.name}
        </Section>
    );
};

export default ClubName;

const Section = styled.div`
  padding-right: 5%;
  padding-left: 5%;
  font-weight: 800;
  font-size: xx-large;
  display: block;
`;
