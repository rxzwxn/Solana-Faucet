import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import React from "react";


export function SendTokens() {
    const wallet = useWallet();
    const { connection } = useConnection();

    async function sendTokens() {
        let to = document.getElementById("to").value;
        let amount = document.getElementById("amount").value;
        const transaction = new Transaction();
        transaction.add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(to),
            lamports: amount * LAMPORTS_PER_SOL,
        }));

        await wallet.sendTransaction(transaction, connection);
        alert("Sent " + amount + " SOL to " + to);
    }

    return (
        <form
            className="form-vertical"
            onSubmit={e => {
                e.preventDefault();
                sendTokens();
            }}
            autoComplete="off"
        >
            <input
                id="to"
                className="input recipient-address"
                type="text"
                placeholder="Recipient Address"
                autoComplete="off"
            />
            <input
                id="amount"
                className="input"
                type="text"
                placeholder="Amount"
                autoComplete="off"
            />
            <button className="button" type="submit">
                Send
            </button>
        </form>
    );
}