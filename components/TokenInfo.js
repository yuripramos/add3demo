import react, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { metaMaskHooks } from '../components/wallet/connectors';
import MintButton from './MintButton';
const abiContract = require('../abi/abi.json');

const TokenInfo = () => {
  const [balance, setBalance] = useState();
  const account = metaMaskHooks.useAccount();
  const [mintAddress, setMintAddress] = useState('');
  const [chainName, setChainName] = useState();
  const [chainId, setChainId] = useState();
  const [symbol, setSymbol] = useState('');
  const [name, setName] = useState('');

  const contractAddress = '0x927DFb9e957526e4D40448d6D05A39ea39a2ee6B';

  useEffect(async () => {
    if (!account || !ethers.utils.isAddress(account)) return;
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner(account);

    provider.getBalance(account).then((result) => {
      setBalance(ethers.utils.formatEther(result));
    });

    provider.getNetwork().then((result) => {
      console.log({ result });
      setChainId(result.chainId);
      setChainName(result.name);
    });

    const contract = new ethers.Contract(contractAddress, abiContract, signer);

    const symbol = await contract.symbol();
    const name = await contract.name();
    setName(name);
    setSymbol(symbol);
  }, [account, mintAddress]);

  return (
    <div className="m-20">
      <div>Token Name: {name}</div>
      <div>Token Symbol: {symbol}</div>
      <div>User Balance: {balance}</div>
      <MintButton setMintAddress={setMintAddress} />
    </div>
  );
};

export default TokenInfo;
