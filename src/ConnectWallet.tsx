import React, { useEffect, useState } from 'react';
import { useConnectWallet } from '@web3-onboard/react';
import { ethers } from 'ethers';

interface Account {
    address: string,
    balance: string,
    ensName: string | null,
    avatar: string | null
}

function ConnectWallet() {
    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
    const [account, setAccount] = useState<Account | null>(null);

    useEffect(() => {
        if (wallet?.provider) {
            const ethersProvider = new ethers.providers.Web3Provider(wallet.provider);

            const loadAccountData = async () => {
                try {
                    const signer = ethersProvider.getSigner();
                    const address = await signer.getAddress();
                    const balance = ethers.utils.formatEther(await signer.getBalance());
                    const ensName = await ethersProvider.lookupAddress(address);
                    const resolver = await ethersProvider.getResolver(ensName || address);
                    const avatar = resolver ? await resolver.getText('avatar') : null;

                    setAccount({
                        address,
                        balance,
                        ensName: ensName || null,
                        avatar
                    });
                } catch (error) {
                    console.error('Error fetching account data:', error);
                    setAccount(null); // Handle error states appropriately.
                }
            };

            loadAccountData();
        } else {
            setAccount(null);
        }
    }, [wallet]);

    if (wallet?.provider && account) {
        return (
            <div>
                {account.avatar ? (<img src={account.avatar} alt="ENS Avatar" />) : null}
                <div>{account.ensName || account.address}</div>
                <div>Balance: {account.balance} ETH</div>
                <div>Connected to {wallet.label}</div>
                <button onClick={() => { disconnect(wallet); }}>Disconnect</button>
            </div>
        );
    }

    return (
        <div>
            <button
                disabled={connecting}
                onClick={() => connect()}>
                Connect
            </button>
        </div>
    );
}

export default ConnectWallet;
