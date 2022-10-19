import { Col } from "react-bootstrap";
import styled from "styled-components";

export const LocalizationHolder = styled(Col)`
  height: 100%;
  z-index: 98;
  margin-left: auto;
  margin-top: ${({ theme }) => theme.width > 767 && "2.8rem"};
`;

export const LocalizationEditorButtonsHolder = styled.td`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

export const LocalizationTitleCount = styled.p`
  font-size: 3rem;
  color: ${({ theme }) => theme.primary};
`;
