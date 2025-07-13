import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

import { Airdrop } from './Airdrop';
import { ShowSolBalance } from './ShowBalance';
import { SignMessage } from './SignMessage';
import { SendTokens } from './SendTokens';

import '@solana/wallet-adapter-react-ui/styles.css';
import './App.css';

function App() {
  const endpoint = 'https://solana-devnet.g.alchemy.com/v2/pJATUfpb0CiTFOdHbsIju';

  return (
    <div className="app-bg">
      <div className="container">
        <h1 className="title">Solana Faucet</h1>
        <p className="tagline">
          Instantly get free test SOL for development and testing on Solana Devnet. Connect your wallet and start building!
        </p>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              <div className="wallet-controls">
                <WalletMultiButton />
                <WalletDisconnectButton />
              </div>
              <div className="card">
                <h2>Airdrop SOL</h2>
                <p>Connect your wallet and request test SOL on Devnet.</p>
                <Airdrop />
                <ShowSolBalance />
                <SignMessage />
                <SendTokens/>
              </div>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </div>
    </div>
  );
}

export default App;
