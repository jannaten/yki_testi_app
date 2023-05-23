import { routes } from '../config';
import Avatar from 'boring-avatars';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'styled-components';
import { onClearUserValue } from '../redux/slices';
import { PlusLg, XLg } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';
import { Nav, Container, Navbar } from 'react-bootstrap';
import { DropDownButton, NavBarHolder } from '../styles';
import { UserProfileNavHolder, SecondaryButton } from '../styles';

function NavScrollExample() {
  const router = useRouter();
  const { width } = useTheme();
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
    <NavBarHolder expand='lg' className='sticky-top'>
      <Container fluid>
        <Navbar.Brand
          style={{ color: '#FBFAF5', cursor: 'pointer' }}
          onClick={() => router.push(home)}>
          YKI harjoittelu
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
            <UserProfileNavHolder>
              <div
                style={{ cursor: 'pointer' }}
                className='d-flex align-items-center justify-content-center flex-wrap'
                onClick={() => setToggleNavDropDown((prev) => !prev)}>
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
                <div
                  className={`d-flex ${
                    width <= 992 ? 'flex-column' : 'flex-row'
                  }`}
                  style={
                    user && toggleNavDropDown ? mountedStyle : unmountedStyle
                  }
                  onClick={() => setToggleNavDropDown((prev) => !prev)}>
                  <DropDownButton
                    className={width <= 992 && 'mt-2'}
                    variant=''
                    onClick={() => {
                      setToggleNavDropDown(!toggleNavDropDown);
                      router.push(profile);
                    }}>
                    profile
                  </DropDownButton>
                  <DropDownButton
                    className=''
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
                </div>
              )}
            </UserProfileNavHolder>
          )}
          {!user && (
            <SecondaryButton
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
}

export default NavScrollExample;
