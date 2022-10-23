// xm < 576, sm >= 576, md >= 768, lg >= 992, xl >= 1200
import { Col } from "react-bootstrap";
import styled from "styled-components";

export const LocalizationHolder = styled(Col)`
  z-index: 98;
  height: 100%;
  margin-left: auto;
  text-align: ${({ theme }) => theme.width < 992 && "center"};
  padding: ${({ theme }) =>
    theme.width >= 992 ? "2rem 3rem 0rem 3rem" : "1.5rem 1rem 0rem 1rem"};
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
