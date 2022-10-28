import react, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { metaMask, metaMaskHooks } from '../components/wallet/connectors';

const TokenInfo = () => {
  const [balance, setBalance] = useState();
  const account = metaMaskHooks.useAccount();
  const [chainName, setChainName] = useState();
  const [chainId, setChainId] = useState();

  useEffect(() => {
    if (!account || !ethers.utils.isAddress(account)) return;
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    console.log('new provider', provider);
    provider.getBalance(account).then((result) => {
      setBalance(ethers.utils.formatEther(result));
    });

    provider.getNetwork().then((result) => {
      console.log({ result });
      setChainId(result.chainId);
      setChainName(result.name);
    });
  }, [account]);

  console.log({ chainName, chainId, balance });

  return (
    <div className="m-20">
      <div>Token Name: </div>
      <div>Token Symbol: </div>
      <div>User Balance: </div>
    </div>
  );
};

export default TokenInfo;
