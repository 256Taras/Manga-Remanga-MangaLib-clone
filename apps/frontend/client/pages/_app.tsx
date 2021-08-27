import { AppProps } from 'next/app';
import useDarkMode from 'use-dark-mode';
import { useEffect } from 'react';
import Head from 'next/head';


import { LayoutUi } from '@manga/ui/main-layout';
import '../styles/styles.scss';
import { reduxNextWrapper } from '../store';

function CustomApp({ Component, pageProps }: AppProps) {
  const DARK_CLASS = 'dark';


  const { value } = useDarkMode(false);

  useEffect(() => {
    if (value) {
      document.documentElement.classList.add(DARK_CLASS);
    } else {
      document.documentElement.classList.remove(DARK_CLASS);
    }
  }, [value]);

  return (
    <>
      <Head>
        <title>Manga App</title>
        <link rel='icon'
              href='https://img1.freepng.ru/20180612/gar/kisspng-uchiha-clan-sasuke-uchiha-obito-uchiha-apple-you-b-sharingan-5b2085e807ff35.9521175615288580880328.jpg' />
      </Head>
      <LayoutUi>
        <main>
          <Component {...pageProps} />
        </main>
      </LayoutUi>

    </>
  );
}


export default reduxNextWrapper.withRedux(CustomApp);
