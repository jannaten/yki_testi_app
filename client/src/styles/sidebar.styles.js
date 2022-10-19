import styled from "styled-components";
import { Col, Container } from "react-bootstrap";

export const SideBarHolder = styled(Col)`
  z-index: 99;
  margin-top: 0rem;
  height: ${({ theme }) => (theme.width > 767 ? "100vh" : "100%")};
  background-color: ${({ theme }) => theme.basic.bright};
  position: ${({ theme }) => theme.width > 767 && "fixed"};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
`;

export const SideBarContainer = styled(Container)`
  margin: ${({ theme }) =>
    theme.width > 575 ? "5rem 0rem 1rem 0rem" : "1rem 0rem 1rem 0rem"};
`;

export const SideBarTableHolder = styled.div`
  overflow-y: scroll;
  max-height: ${({ theme }) => (theme.height > 722 ? "63vh" : "18rem")};
`;
