import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
import { metaMask, metaMaskHooks } from '../components/wallet/connectors';
import TokenInfo from '../components/TokenInfo';

export default function Home() {
  const { connector } = useWeb3React();
  const [error, setError] = useState('');
  const [mintAddress, setMintAddress] = useState(null);

  const isActive = metaMaskHooks.useIsActive();
  const account = metaMaskHooks.useAccount();

  const chainId = metaMaskHooks.useChainId();

  const connect = async () => {
    try {
      await metaMask.activate(chainId);
      localStorage.setItem('walletConnected', account);
    } catch (ex) {
      console.log(ex);
      setError(`Failed to connect`);
    }
  };

  const disconnect = async () => {
    try {
      await metaMask.resetState();
      localStorage.setItem('walletConnectedAccount', undefined);
    } catch (ex) {
      console.log(ex);
      setError(ex);
    }
  };

  return (
    <>
      {mintAddress && (
        <div className="bg-green-400 text-center text-white p-2">
          minted tokens to address {mintAddress}
        </div>
      )}
      <div className="grid justify-items-end m-10">
        {!isActive ? (
          <button
            onClick={connect}
            className="py-2 mt-20 mb-4 text-lg font-bold hover:bg-green-800 text-white rounded-lg w-56 bg-green-600 item-end"
          >
            Connect to MetaMask
          </button>
        ) : (
          <button
            onClick={disconnect}
            className="py-2 mt-20 mb-4 text-lg font-bold text-white hover:bg-green-800 rounded-lg w-56 bg-green-600 "
          >
            Disconnect
          </button>
        )}
        <div>
          {isActive ? (
            <span>
              Connected with <b>{account}</b>
            </span>
          ) : (
            <span>Not connected</span>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-start">
        {error && <span>{error}</span>}
        <TokenInfo setMintAddress={setMintAddress} mintAddress={mintAddress} />
      </div>
    </>
  );
}
