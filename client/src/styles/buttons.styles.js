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
