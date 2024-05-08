import React from 'react';
import { Web3OnboardProvider, init } from '@web3-onboard/react';
import injectedModule from '@web3-onboard/injected-wallets';
import ConnectWallet from './ConnectWallet';

const injected = injectedModule();

const web3Onboard = init({
  wallets: [injected],
  chains: [
    {
      id: '0x1', // Ethereum Mainnet
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: `https://mainnet.infura.io/v3/${process.env.ec38c2436cc4423bba47304d67d1990d}`
    },
    {
      id: '0x89', // Polygon Mainnet
      token: 'MATIC',
      label: 'Polygon - Mainnet',
      rpcUrl: 'https://rpc-mainnet.maticvigil.com'
    }
  ],
  appMetadata: {
    name: 'Connect Wallet Example',
    icon: '<svg>My App Icon</svg>',
    description: 'Example showcasing how to connect a wallet.'
  }
});

function App() {
  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <ConnectWallet />
    </Web3OnboardProvider>
  );
}

export default App;
