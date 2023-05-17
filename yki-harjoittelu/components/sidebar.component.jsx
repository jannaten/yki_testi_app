import React from 'react';
import { routes } from '../config';
import { useRouter } from 'next/router';
import { useTheme } from 'styled-components';
import { sortStudyWords } from '../redux/slices';
import { useDispatch, useSelector } from 'react-redux';
import { SideBarContainer, PrimaryButton } from '../styles';

function Sidebar() {
  const router = useRouter();
  const { width } = useTheme();
  const dispatch = useDispatch();
  const { flipCard, add_translation } = routes;
  const { user } = useSelector(({ user }) => user);
  return (
    <SideBarContainer>
      <PrimaryButton
        disabled={!user}
        onClick={() => {
          router.push(add_translation);
        }}
        className={
          user?.type === 'admin'
            ? 'w-100 mt-3'
            : width < 992 && user?.type === 'admin'
            ? 'w-100 mt-3'
            : 'w-100'
        }
        variant=''>
        Add translations
      </PrimaryButton>
      <PrimaryButton className='w-100 mt-3' disabled={!user} variant=''>
        Memorized words
      </PrimaryButton>
      <PrimaryButton
        variant=''
        disabled={!user}
        className='w-100 mt-3'
        onClick={() => dispatch(sortStudyWords())}>
        Study plan words
      </PrimaryButton>
      <PrimaryButton
        className='w-100 mt-3'
        disabled={!user}
        variant=''
        onClick={() => {
          router.push(flipCard);
        }}>
        Play card game
      </PrimaryButton>
    </SideBarContainer>
  );
}

export default Sidebar;
