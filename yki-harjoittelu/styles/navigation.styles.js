// xm < 576, sm >= 576, md >= 768, lg >= 992, xl >= 1200
import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';

export const NavBarHolder = styled(Navbar)`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  background-color: ${({ theme }) => theme.primary};
`;

export const UserProfileNavHolder = styled.div`
  color: ${({ theme }) => theme.basic.bright};
  display: flex;
  flex-wrap: wrap;
  margin-right: 1rem;
  width: fit-content;
  align-items: center;
  border-radius: 0.3rem;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.width < 992 && '1rem'};
  border: ${({ theme }) => `0.1rem solid ${theme.basic.bright}`};
  padding: ${({ theme }) => theme.width < 992 ? '0.5rem 1rem' : '0.2rem 1rem'};
  flex-direction: ${({ theme }) => (theme.width < 992 ? 'column' : 'row')};
`;
