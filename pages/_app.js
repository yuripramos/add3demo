import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { Web3ReactProvider } from '@web3-react/core';
import { metaMask, metaMaskHooks } from '../components/wallet/connectors';

const connectors = [[metaMask, metaMaskHooks]];

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider connectors={connectors}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}

export default MyApp;
