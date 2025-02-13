import '../styles/globals.scss'
import type { AppProps } from "next/app";
import AuthLayout from './auth/layout';
import RootLayout from './layout';

const AUTH = "auth"

export default function App({ Component, pageProps, router }: AppProps) {
  if (router?.pathname?.split("/")?.filter(x => x)?.[0] === AUTH) {
    return <AuthLayout><Component {...pageProps} /></AuthLayout>
  } else {
    return <RootLayout><Component {...pageProps} /></RootLayout>
  }
}

