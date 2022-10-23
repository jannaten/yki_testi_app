// xm < 576, sm >= 576, md >= 768, lg >= 992, xl >= 1200
import styled from "styled-components";
import { Navbar } from "react-bootstrap";

export const NavBarHolder = styled(Navbar)`
  z-index: 100;
  width: 100%;
  cursor: pointer;
  margin-top: 0rem;
  background-color: ${({ theme }) => theme.primary};
  position: ${({ theme }) => theme.width <= 992 && "fixed"};
  margin-bottom: ${({ theme }) => theme.width >= 992 && "auto"};
`;

// export const SideBarColHolderStyle = styled(Col)`
//   width: ${({ width }) => width > 575 && "13vw"};
//   position: ${({ width }) => width > 575 && "fixed"};
//   margin-top: ${({ width }) => width > 575 && "3.5rem"};
//   z-index: 6;
// `;

// export const TableColHolderStyle = styled(Col)`
//   width: 87vw;
//   margin-left: auto;
//   margin-top: 5.5rem;
//   padding-left: 2rem;
// `;

// export const SideBarHolderStyle = styled.div`
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   background-color: #e9ecef;
//   border: 0.2rem solid #e9ecef;
//   padding: 2rem 0.5rem 0rem 0.6rem;
// `;

// export const SideBarButtomButtonStyle = styled.div`
//   margin-top: 45vh;
// `;

// import styled from "styled-components";
// import { Navbar } from "react-bootstrap";

// export const NavBarHolderStyle = styled(Navbar)`
//   z-index: 7;
//   width: 100%;
//   position: fixed;
//   margin-top: 0rem;
//   background-color: ${({ theme }) => theme.primary};
// `;

// export const ThemePalleteStyle = styled.div`
//   width: 2rem;
//   height: 2rem;
//   cursor: pointer;
//   border-radius: 10%;
//   margin-top: 0.3rem;
//   margin-left: 0.5rem;
//   margin-right: 0.3rem;
//   border: 0.25rem solid #ffffff7f;
//   box-shadow: 0rem 0rem 0.25rem #ffffff7f;
//   background-color: ${({ theme, themeColor, bright }) =>
//     bright ? themeColor : theme.primary};
// `;

// import styled from "styled-components";
// import { InputGroup } from "react-bootstrap";

// export const InputGroupTextStyle = styled(InputGroup.Text)`
//   color: ${({ theme }) => theme.basic.bright};
//   background-color: ${({ theme }) => theme.primary};
// `;

// export const SuccessToastStyle = (theme) => {
//   return {
//     width: "auto",
//     display: "grid",
//     transition: "1s",
//     borderRadius: "0px",
//     color: `${theme.secondary}`,
//     transform: "translate(400px)",
//     gridTemplateColumns: "1.2fr 6fr 0.5fr",
//     backgroundColor: `${theme.basic.light}`,
//     borderLeft: `0.3rem solid ${theme.primary}`,
//   };
// };

// export const ErrorToastStyle = {
//   display: "grid",
//   transition: "1s",
//   borderRadius: "0px",
//   backgroundColor: "#ffffff",
//   transform: "translate(400px)",
//   borderLeft: "0.3rem solid #ff355b",
//   gridTemplateColumns: "1.2fr 6fr 0.5fr",
// };
