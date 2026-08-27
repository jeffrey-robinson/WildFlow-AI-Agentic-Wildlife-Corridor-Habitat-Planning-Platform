import '../styles/globals.css';
import AppLayout from '../components/AppShell/AppLayout';

export default function App({ Component, pageProps, router }) {
  // Public pages without AppLayout shell
  const isPublicPage = ['/', '/login', '/register'].includes(router.pathname);

  if (isPublicPage) {
    return <Component {...pageProps} />;
  }

  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
}
