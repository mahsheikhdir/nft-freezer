import 'tailwindcss/tailwind.css'
import Link from 'next/link';

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-indigo-900 to-indigo-900 min-h-screen">
      <div className="flex items-end p-5 gap-5 mx-auto w-3/5 text-white">
        <Link href='/'>
          <a className="text-4xl pr-32 font-semibold">NFTFreezer</a>
        </Link>
        <Link href='/contracts'>
          <a className="font-semibold">CONTRACTS</a>
        </Link>
        <Link href='/fridge'>
          <a className="font-semibold">MY FRIDGE</a>
        </Link>
      </div>
      <div className="mx-auto w-3/5 p-5">
        <Component {...pageProps} />
      </div>

    </div>
  )

}

export default MyApp
