import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction} from "@solana/web3.js";


export function SendTokens() {
    const wallet = useWallet();
    const {connection} = useConnection();

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
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <input id="to" className="input" type="text" placeholder="Recipient Address" style={{ width: '100%', maxWidth: 260 }} />
            <input id="amount" className="input" type="text" placeholder="Amount" style={{ width: '100%', maxWidth: 260 }} />
            <button className="button" onClick={sendTokens} style={{ width: '100%', maxWidth: 260 }}>
                Send
            </button>
        </div>
    );
}