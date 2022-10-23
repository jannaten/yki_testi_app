// xm < 576, sm >= 576, md >= 768, lg >= 992, xl >= 1200
import styled from "styled-components";
import { Navbar } from "react-bootstrap";

export const NavBarHolder = styled(Navbar)`
  z-index: 100;
  cursor: pointer;
  width: ${({ theme }) => theme.width >= 992 && "100vw"};
  position: ${({ theme }) => theme.width >= 992 && "fixed"};
  background-color: ${({ theme }) => theme.primary};
  margin-bottom: ${({ theme }) => theme.width >= 992 && "auto"};
`;
