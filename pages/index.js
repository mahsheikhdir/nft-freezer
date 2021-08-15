import Head from 'next/head'

export default function Home() {
  return (
    <div>

      
      <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
      <div className="text-sm mb-6">
        Submit ERC-721 NFTs with centralized metadata to be uploaded to IPFS and stored on the polygon blockchain.
      </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        Contract
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="network">
        Network
      </label>
      <input name="network" type="radio"/>
      <label className="px-4 text-gray-700 text-sm font-bold" htmlFor="network">Mainnet</label>
      <input name="network" type="radio"/>
      <label className="px-4 text-gray-700 text-sm font-bold" htmlFor="network">Polygon</label>
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Token
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="66"/>
    </div>
    <div className="flex items-center justify-between">
      <button className="bg-blue-500 mx-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Submit
      </button>
    </div>
  </form>
    </div>
  )
}
