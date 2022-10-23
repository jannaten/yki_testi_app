// xm < 576, sm >= 576, md >= 768, lg >= 992, xl >= 1200
import styled from "styled-components";
import { Col, Container } from "react-bootstrap";

export const SideBarHolder = styled(Col)`
  z-index: 99;
  background-color: ${({ theme }) => theme.basic.bright};
  height: ${({ theme }) => theme.width >= 992 && "100vh"};
  position: ${({ theme }) => theme.width >= 992 && "fixed"};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
`;

export const SideBarContainer = styled(Container)`
  margin-top: ${({ theme }) => (theme.width >= 992 ? "3rem" : "2rem")};
  margin-bottom: ${({ theme }) => theme.width < 992 && "2rem"};
`;

export const SideBarTableHolder = styled.div`
  overflow-y: scroll;
  max-height: ${({ theme }) => (theme.height > 722 ? "63vh" : "18rem")};
`;

export const SideBarLocalizationMatchTitle = styled.p`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.primary};
`;

export const SideBarLocalizationMatchHolder = styled.div`
  opacity: 0.7;
  padding-top: 2rem;
  text-align: center;
`;
