import react, { useState, useEffect } from 'react';
import { BigNumber, ethers } from 'ethers';
import { metaMaskHooks } from '../components/wallet/connectors';
import MintButton from './MintButton';
const abiContract = require('../abi/abi.json');

const TokenInfo = ({ mintAddress, setMintAddress, setIsTransferConfirmed }) => {
  const [balance, setBalance] = useState();
  const account = metaMaskHooks.useAccount();

  const [chainName, setChainName] = useState();
  const [chainId, setChainId] = useState();
  const [symbol, setSymbol] = useState('');
  const [name, setName] = useState('');

  const contractAddress = '0x927DFb9e957526e4D40448d6D05A39ea39a2ee6B';

  const checkNetwork = async () => {
    if (window.ethereum) {
      const chainId = ethers.utils.hexValue(5);
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainId }],
        });
      } catch (error) {
        console.error('error', error);
      }
    }
  };

  useEffect(async () => {
    if (!account || !ethers.utils.isAddress(account)) return;
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');

    provider.on('network', (newNetwork, oldNetwork) => {
      // When a Provider makes its initial connection, it emits a "network"
      // event with a null oldNetwork along with the newNetwork. So, if the
      // oldNetwork exists, it represents a changing network
      if (oldNetwork) {
        window.location.reload();
      }
    });

    const signer = provider.getSigner(account);

    // Ensure that is connected to Göerli Network
    await checkNetwork();

    const contract = new ethers.Contract(contractAddress, abiContract, signer);

    provider.getBalance(account).then((result) => {
      setBalance(ethers.utils.formatEther(result));
    });

    provider.getNetwork().then(async (result) => {
      setChainId(result.chainId);
      setChainName(result.name);
    });

    if (mintAddress) {
      const tx = await contract.mint(mintAddress, BigNumber.from('4'));
      let receipt = await tx.wait(1);

      console.log('receipt =>', receipt);
      if (receipt) {
        setIsTransferConfirmed(true);
        setTimeout(() => {
          setIsTransferConfirmed(false);
        }, 5000);
      }
    }

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
