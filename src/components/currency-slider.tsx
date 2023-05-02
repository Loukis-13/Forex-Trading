import React, { Dispatch, SetStateAction } from 'react';
import { Options, Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import { Splide as SplideObj, SlideComponent } from '@splidejs/splide/dist/types/index'
// import currencies from '../currencies.json'
import '@splidejs/react-splide/css';

interface CurrencyParams {
    currencies: any,
    coin?: string,
    setCoin: Dispatch<SetStateAction<number>>
}

export default function CurrencySlider({ currencies, coin = "EUR", setCoin }: CurrencyParams) {
    const opts: Options = {
        height: '100vh',
        direction: 'ttb',
        wheel: true,
        type: 'loop',
        drag: 'free',
        snap: true,
        focus: 'center',
        perPage: 5,
        gap: 10,
        arrows: false,
        pagination: false,
        isNavigation: true,
        start: Object.keys(currencies.rates).indexOf(coin),
    }

    function updateCoin(_splide: SplideObj, slide: SlideComponent) {
        setCoin(currencies.rates[slide.slide.textContent! as keyof typeof currencies.rates])
    }

    return (
        <Splide onActive={updateCoin} options={opts} hasTrack={false} aria-label="Currencies">
            <SplideTrack>
                {Object.keys(currencies.rates).map(x => (
                    <SplideSlide key={x} className='flex items-center justify-center shadow-lg rounded-lg bg-slate-800 text-white place-self-center px-16 text-3xl align-middle'>
                        {x}
                    </SplideSlide>
                ))}
            </SplideTrack>
        </Splide>
    )
}
