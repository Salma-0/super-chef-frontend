import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {AuthProvider} from 'context/AuthContext'
import Router from 'next/router';
import NProgress from 'nprogress';

NProgress.configure( { showSpinner: false } );
Router.events.on( 'routeChangeStart', () => NProgress.start() );
Router.events.on( 'routeChangeComplete', () => NProgress.done() );
Router.events.on( 'routeChangeError', () => NProgress.done() );


function MyApp({ Component, pageProps }: AppProps) {
  return <AuthProvider><Component {...pageProps} /></AuthProvider>
}
export default MyApp
