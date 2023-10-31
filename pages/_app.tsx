import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline, AppBar, Toolbar, Link, createTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import Navbar from './components/navbar'; // Import your Navbar component
import Footer from './components/footer'; // Import your Footer component

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Now you can access the routing properties like pathname, query, etc.
  const { pathname, query } = router;

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Navbar/>
    <div>
      <Component {...pageProps} />
    </div>
    <Footer/>
  </ThemeProvider>
  );
}

export default MyApp;
