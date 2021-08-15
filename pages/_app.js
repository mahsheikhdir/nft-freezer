import 'tailwindcss/tailwind.css'
import Link from 'next/link';
import {useState, useEffect} from 'react';
import {ethers} from 'ethers';

function MyApp({ Component, pageProps }) {

  const [account, setAccount] = useState("");
  const [connected, setConnected] = useState(false);
  const [network, setNetwork] = useState("");
  
  async function Connect() {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        // Prompt user for account connections
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        console.log("Account:", await signer.getAddress());
        setAccount(await signer.getAddress())
        setConnected(true);

        const network = await provider.getNetwork();
        console.log('network', network)
        setNetwork(network.name)
  }

  useEffect(() => {
    Connect();
    window.ethereum.on('accountsChanged', function (accounts) {
      console.log("changed accounts")
      setAccount(accounts[0])
      Connect()
    })
    window.ethereum.on('disconnect', function (accounts) {
      console.log("disconnect")
      setAccount("")
      setConnected(false);
      Connect()
    })
    window.ethereum.on('chainChanged', function (accounts) {
      console.log("chainChanged")
      setAccount("")
      Connect()
    })
  }, [])

  return (
    <div>
      <div className="flex items-center p-5 gap-5 mx-auto w-3/5">
        <Link href='/'>
          <a className="text-4xl pr-12 font-semibold">NFTFreezer</a>
        </Link>
        <Link href='/contracts'>
          <a className="font-semibold">CONTRACTS</a>
        </Link>
        <Link href='/fridge'>
          <a className="font-semibold">MY FRIDGE</a>
        </Link>
        <div className="font-semibold p-1 rounded bg-purple-600 text-white" onClick={Connect}>
          { connected ? ((network == 'matic') ? <a href={"https://www.polygonscan.com/address/" + account} target="_blank"> {account.substr(0,8) + '...' + account.substr(-5, 5)}</a>: 'WRONG NETWORK') : 'NOT CONNECTED'}
        </div>
      </div>
      <div className="mx-auto w-3/5 p-5">
        <Component {...pageProps} />
      </div>

    </div>
  )

}

export default MyApp
