import { useEffect, useState } from 'react';
import freezer from '../contracts/NFTFreezer.json';
import { ethers } from 'ethers';

const addr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function Fridge() {
    const [entries, setEntries] = useState([]);
    const [account, setAccount] = useState('');

    useEffect(async () => {
        console.log('loaded');

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            console.log("Account:", await signer.getAddress());


            setAccount(await signer.getAddress());
            const freezer_rw = new ethers.Contract(addr, freezer, signer);

            let filterUser = freezer_rw.filters.NewEntry(null, null, signer._address)
            let k = await freezer_rw.queryFilter(filterUser)


            let entries1 = [];

            for (let log in k) {

                let args = k[log].args;

                //console.log(log, args.NFTcontract, args.network, args.token)
                let entry = await freezer_rw.currentEntry(args.NFTcontract, args.network, args.token);

                let newEntry = {
                    contract : args.NFTcontract,
                    network: args.network,
                    token: args.token,
                    timestamp: entry[0],
                    cid: entry[1],
                    uri: entry[2]
                }

                //console.log(newEntry);
                entries1.push(newEntry);
            }

            console.log(entries1);
            setEntries(entries1);
        } catch (err) {
            console.log(err);
        }
    }, [])

    return (
        <div className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
            <div className="text-xl font-semibold mb-6">
                Fridge for {account}

            </div>
            {entries.map((v, i) =>
                //<a key={i} className="font-mono">{v[1]} on { v[0] == 1 ? "MAINNET" : "MATIC"} </a>
                <div className="font-mono mb-3">
                <div className="font-semibold text-xl"> Entry {i} </div>
                <div> CONTRACT {v.contract} </div>
                <div> NETWORK {v.network == 1 ? "MAINNET" : "POLYGON"} </div>
                <div> TOKEN {v.token.toString()} </div>
                <div> TIMESTAMP {v.timestamp.toString()}</div>
                <div> CID {v.cid ? v.cid : "NOT UPDATED"} </div>
                <div> URI {v.uri ? v.uri : "NONE"} </div>
                </div>
            )}
        </div>
    )
}
