import Head from 'next/head';
import { Row } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from 'styled-components';
import { loadUserWords } from '../../redux/slices';
import Sidebar from '../../components/sidebar.component';
import { SideBarHolder, LocalizationHolder } from '../../styles';
import { loadLanguages, loadTranslations } from '../../redux/slices';
import LocalizationKeyValueBody from '../../components/localization-key-values-body.component';

function DictionaryPage() {
  const { width } = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.token &&
      dispatch(loadUserWords({ token: localStorage.token }));
    dispatch(loadLanguages());
  }, []);

  return (
    <div>
      <Head>
        <title>Dictionary</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Row className={width >= 992 ? 'pt-5 m-0 pb-0 pe-0 ps-0' : 'm-0 p-0'}>
        <SideBarHolder xm={12} sm={12} md={12} lg={3} xl={2}>
          <Sidebar />
        </SideBarHolder>
        <LocalizationHolder xm={12} sm={12} md={12} lg={9} xl={10}>
          <LocalizationKeyValueBody />
        </LocalizationHolder>
      </Row>
    </div>
  );
}

export default DictionaryPage;