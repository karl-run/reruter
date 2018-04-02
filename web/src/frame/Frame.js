import React from 'react';
import styled from 'styled-components';

const StyledFrame = styled.div`
  padding: 16px;
`;

const Frame = ({ children }) => {
  return (
    <StyledFrame>
      <h1>Reruter</h1>
      {children}
    </StyledFrame>
  );
};

export default Frame;
