import "../styles/globals.css";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      Hello
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
