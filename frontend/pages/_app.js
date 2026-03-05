import "react-toastify/dist/ReactToastify.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-modal-video/scss/modal-video.scss';
import '../styles/animate.css'
import '../styles/flaticon_aidus.css'
import "../styles/font-awesome.min.css";
import "../styles/themify-icons.css";
import '../styles/sass/style.scss'
import { ToastContainer } from 'react-toastify';
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store/index";
import { Provider } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Head from 'next/head'
import Layout from '../components/Layout/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        {/* Basic Meta Tags */}
        <title>Ghines Foundation | Every Action Counts</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Every Action, Big or Small, Counts." />
        
        {/* Open Graph / Facebook / WhatsApp */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ghinesfoundation.org/" />
        <meta property="og:title" content="Ghines Foundation" />
        <meta property="og:description" content="Every Action, Big or Small, Counts." />
        <meta property="og:image" content="https://ghinesfoundation.org/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ghines Foundation" />
        <meta name="twitter:description" content="Every Action, Big or Small, Counts." />
        <meta name="twitter:image" content="https://ghinesfoundation.org/og-image.jpg" />
      </Head>

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout> 
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
      <ToastContainer />
    </div>
  )
}

export default MyApp;