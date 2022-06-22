import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { DefaultSeo } from 'next-seo';

import theme from '@/theme/theme';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function AwesomeApp({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <DefaultSeo
          defaultTitle="Dashboard | Nitrous Oxide Snail"
          titleTemplate="%s | Nitrous Oxide Snail"
          description="Nitrous Oxide Snail is generative 5.555 NFT on ethereum blockchain."
          additionalLinkTags={[
            {
              rel: "icon",
              href: "/speedsnail_icon.svg",
            },
          ]}
        />
      <ChakraProvider theme={theme}>
          {getLayout(<Component {...pageProps} />)}
      </ChakraProvider>
    </>
  );
}

export default AwesomeApp;
