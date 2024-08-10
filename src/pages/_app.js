import StyledComponentsRegistry from '@/lib/registry';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <StyledComponentsRegistry>
      {<Component {...pageProps} />}
    </StyledComponentsRegistry>
  );
}
