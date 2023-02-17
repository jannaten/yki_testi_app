// import "bootstrap/dist/css/bootstrap.min.css";
import Head from 'next/head';
import store from '../redux/store';
import Layout from '../components/Layout';
import { Provider as ReduxProvider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import '../styles/globals.css';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  * {
    font-family: "Signika", sans-serif;
  }
`;

function MyApp({ Component, pageProps }) {
  return (
    <ReduxProvider store={store}>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ReduxProvider>
  );
}

export default MyApp;
