import { useEffect, useState } from 'react';
import freezer from '../contracts/NFTFreezer.json';
import { ethers } from 'ethers';

const addr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function Contracts() {

    const [contracts, setContracts] = useState([]);

    useEffect(async () => {
        console.log('loaded');

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            console.log("Account:", await signer.getAddress());


            const freezer_rw = new ethers.Contract(addr, freezer, signer);

            let k = await freezer_rw.getContracts();

            setContracts(k);
        } catch (err) {
            console.log(err);
        }
    }, [])

    return (
        <div className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
            <div className="text-xl font-semibold mb-6">
                Contracts</div>
                {contracts.map((v, i) =>
                <a key={i} className="font-mono">{v[1]} on { v[0] == 1 ? "MAINNET" : "MATIC"} </a>
                )}
        </div>
    )
}
