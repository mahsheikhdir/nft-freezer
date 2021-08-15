import Head from 'next/head'
import { useState } from 'react'
import freezer from '../contracts/NFTFreezer.json';
import { ethers } from 'ethers';

const addr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function Home() {

  const [contract, setContract] = useState('');
  const [network, setNetwork] = useState(1);
  const [token, setToken] = useState('');


  async function submit(event) {
    console.log("submit");
    console.log(contract, network, token);

    event.preventDefault();

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      console.log("Account:", await signer.getAddress());
  
  
      const freezer_rw = new ethers.Contract(addr, freezer, signer);
  
      freezer_rw.addToken(contract, token, '', network);
    } catch (err) {
      console.log(err);
    }
    
  }

  return (
    <div>
      <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
        <div className="text-sm mb-6">
          Submit ERC-721 NFTs with centralized metadata to beuploaded to IPFS and stored on the polygon blockchain.
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Contract
          </label>
          <input onChange={(e) => setContract(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="contract" type="text" placeholder="0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174" required />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="network">
            Network
          </label>
          <input onChange={(e) => setNetwork(1)} name="network" type="radio" />
          <label className="px-4 text-gray-700 text-sm font-bold" htmlFor="network">Mainnet</label>
          <input onChange={(e) => setNetwork(2)} name="network" type="radio" />
          <label className="px-4 text-gray-700 text-sm font-bold" htmlFor="network">Polygon</label>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Token
          </label>
          <input onChange={(e) => setToken(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="token" type="number" placeholder="66" required />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 mx-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={(e) => submit(e)} >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
