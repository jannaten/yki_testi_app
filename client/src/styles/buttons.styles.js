// xm < 576, sm >= 576, md >= 768, lg >= 992, xl >= 1200
import styled from "styled-components";
import { Button } from "react-bootstrap";

export const PrimaryButton = styled(Button)`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.basic.bright};
  &:hover {
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.basic.bright};
  }
`;

export const SecondaryButton = styled(Button)`
  background-color: ${({ theme }) => theme.basic.bright};
  color: ${({ theme }) => theme.primary};
  &:hover {
    border: ${({ theme }) => `0.2rem solid ${theme.basic.bright}`};
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.basic.bright};
  }
`;

// export const FacebookAuthButton = styled(FacebookLogin)`
//   ${(props) =>
//     props.className === "kep-login-facebook" &&
//     css`
//       background-color: none !important;
//       font-size: 0.9rem;
//       color: #066cd2;
//       border: none;
//     `};
// `;
