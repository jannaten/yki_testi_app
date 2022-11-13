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

export const PrimaryRowButton = styled(Button)`
background-color: ${({ theme, outline }) => outline && theme.primary};
	color: ${({ theme, outline }) => outline ? theme.basic.bright : theme.primary} !important;
	border: ${({ theme, outline }) => !outline && `0.05rem solid ${theme.primary}`}; 
  &:hover {
    background-color: ${({ theme, outline }) => !outline ? theme.primary : theme.secondary};
		color: ${({ theme, outline }) => !outline && theme.basic.bright} !important;
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

export const DropDownButton = styled(Button)`
  background-color: ${({ theme }) => theme.basic.primary};
  color: ${({ theme }) => theme.basic.bright};
	&:hover {
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.basic.bright};
  }
`;

// export const FacebookAuthButton = styled(FacebookLogin)`
//   ${(props) =>
//     props.className === "kep-login-facebook" &&
//     css`
//       background-color: none;
//       font-size: 0.9rem;
//       color: #066cd2;
//       border: none;
//     `};
// `;
