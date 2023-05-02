import { useState } from 'react';
import { Inter } from 'next/font/google'
import CurrencySlider from '@/components/currency-slider';

const inter = Inter({ subsets: ['latin'] })

Home.getInitialProps = async function () {
  const currencies = await fetch('https://api.exchangerate.host/latest').then(res => res.json())
  return { currencies }
}

export default function Home({ currencies }: { currencies: any }) {
  const [coin1, setCoin1] = useState(0)
  const [coin2, setCoin2] = useState(0)

  const [ammount1, setAmmount1] = useState(1)
  let ammount2 = coin1 != coin2 ? ammount1 / coin1 * coin2 : ammount1

  return (
    <main className={`flex flex-col items-center bg-slate-700 ${inter.className}`}>
      <div className='grid grid-cols-[1fr,1fr,30px,1fr,1fr] gap-4'>
        <p className='text-center absolute left-1/2 transform -translate-x-1/2'>
          data extracted from <br />
          <a href='https://exchangerate.host' className='text-blue-600'>exchangerate.host</a>
        </p>

        <CurrencySlider currencies={currencies} setCoin={setCoin1} />

        <div className='my-auto'>
          <input className='py-2 text-center' type='number' value={ammount1} onChange={(e) => setAmmount1(Number(e.target.value))} />
        </div>

        <div className='m-auto text-5xl text-white'>X</div>

        <div className='my-auto'>
          <input className='py-2 text-center' type='number' value={ammount2} onChange={(e) => setAmmount1(Number(e.target.value) * coin1 / coin2)} />
        </div>

        <CurrencySlider currencies={currencies} coin='BRL' setCoin={setCoin2} />
      </div>
    </main>
  )
}
