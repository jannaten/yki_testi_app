import { routes } from '../config';
import Avatar from 'boring-avatars';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { onClearUserValue } from '../redux/slices';
import { PlusLg, XLg } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';
import { successToast } from './common/toast.component';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import { DropDownButton, NavBarHolder, SecondaryButton } from '../styles';
import { NavBarToggleButtonHolder, UserProfileNavHolder } from '../styles';

// function NavbarComponent() {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { home, identify, profile } = routes;
//   const { user } = useSelector(({ user }) => user);
//   const [toggleButton, setToggleButton] = useState(false);
//   const [toggleNavDropDown, setToggleNavDropDown] = useState(false);

//   const mountedStyle = { animation: 'inAnimation 250ms ease-in' };
//   const unmountedStyle = {
//     animation: 'outAnimation 270ms ease-out',
//     animationFillMode: 'forwards'
//   };
//   return (
//     <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
//       <Container>
//         <Navbar.Brand onClick={() => router.push(home)}>
//           YKI harjoittelu
//         </Navbar.Brand>
//         <Navbar.Toggle
//           aria-controls='navbarScroll'
//           style={{ border: 'none', boxShadow: 'none' }}>
//           {toggleButton ? (
//             <XLg
//               width={35}
//               height={35}
//               color='#fff'
//               onClick={() => setToggleButton(!toggleButton)}
//             />
//           ) : (
//             <PlusLg
//               width={35}
//               height={35}
//               color='#fff'
//               onClick={() => setToggleButton(!toggleButton)}
//             />
//           )}
//         </Navbar.Toggle>
//         <Navbar.Collapse id='responsive-navbar-nav'>
//           <Nav className='me-auto'>
//             <Nav.Link href='#features'>Features</Nav.Link>
//             <Nav.Link href='#pricing'>Pricing</Nav.Link>
//             <NavDropdown title='Dropdown' id='collasible-nav-dropdown'>
//               <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
//               <NavDropdown.Item href='#action/3.2'>
//                 Another action
//               </NavDropdown.Item>
//               <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item href='#action/3.4'>
//                 Separated link
//               </NavDropdown.Item>
//             </NavDropdown>
//           </Nav>
//           <Nav>
//             <Nav.Link href='#deets'>More deets</Nav.Link>
//             <Nav.Link eventKey={2} href='#memes'>
//               Dank memes
//             </Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default NavbarComponent;

const NavbarComponent = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { home, identify, profile } = routes;
  const { user } = useSelector(({ user }) => user);
  const [toggleButton, setToggleButton] = useState(false);
  const [toggleNavDropDown, setToggleNavDropDown] = useState(false);

  const mountedStyle = { animation: 'inAnimation 250ms ease-in' };
  const unmountedStyle = {
    animation: 'outAnimation 270ms ease-out',
    animationFillMode: 'forwards'
  };

  return (
    <NavBarHolder expand='lg'>
      <Container fluid>
        <Navbar.Brand className='px-4 mt-1'>
          <h5 style={{ color: '#FBFAF5' }} onClick={() => router.push(home)}>
            YKI harjoittelu
          </h5>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls='navbarScroll'
          style={{ border: 'none', boxShadow: 'none' }}>
          {toggleButton ? (
            <XLg
              width={35}
              height={35}
              color='#fff'
              onClick={() => setToggleButton(!toggleButton)}
            />
          ) : (
            <PlusLg
              width={35}
              height={35}
              color='#fff'
              onClick={() => setToggleButton(!toggleButton)}
            />
          )}
        </Navbar.Toggle>
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='me-auto my-2 my-lg-0'
            style={{ maxHeight: '100px' }}
            navbarScroll></Nav>
          {user && (
            <UserProfileNavHolder
              onClick={() => setToggleNavDropDown((prev) => !prev)}>
              <div className='d-flex align-items-center justify-content-center flex-wrap'>
                <Avatar
                  size={40}
                  variant='beam'
                  name={user.full_name}
                  colors={[
                    '#92A1C6',
                    '#146A7C',
                    '#ffffff',
                    '#C271B4',
                    '#C20D90'
                  ]}
                />
                <span className='me-2 ms-2'>{user.username}</span>
              </div>
              {user && toggleNavDropDown && (
                <NavBarToggleButtonHolder
                  style={
                    user && toggleNavDropDown ? mountedStyle : unmountedStyle
                  }
                  onClick={() => setToggleNavDropDown((prev) => !prev)}>
                  <DropDownButton
                    variant=''
                    onClick={() => {
                      setToggleNavDropDown(!toggleNavDropDown);
                      router.push(profile);
                    }}>
                    user information
                  </DropDownButton>
                  <DropDownButton
                    variant=''
                    onClick={() => {
                      setToggleNavDropDown((prev) => !prev);
                      localStorage.removeItem('token');
                      router.push(home);
                      dispatch(onClearUserValue());
                      successToast('Succesfully logged out');
                    }}>
                    sign out
                  </DropDownButton>
                </NavBarToggleButtonHolder>
              )}
            </UserProfileNavHolder>
          )}
          {!user && (
            <SecondaryButton
              className='me-5'
              variant=''
              onClick={() => {
                router.push(identify);
              }}>
              sign in
            </SecondaryButton>
          )}
        </Navbar.Collapse>
      </Container>
    </NavBarHolder>
  );
};

export default NavbarComponent;
