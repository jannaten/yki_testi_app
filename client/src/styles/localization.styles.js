import { Col } from "react-bootstrap";
import styled from "styled-components";

export const LocalizationHolder = styled(Col)`
  height: 100%;
  z-index: 98;
  margin-left: auto;
  margin-top: ${({ theme }) => theme.width > 767 && "2.8rem"};
`;
