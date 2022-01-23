import React, { Component } from 'react'
import '../Coin.css'

export default function Coin(props){

    const {image, name, symbol, price, volume, priceChange,marketcap} = props

    return (
        <div className='coin-cointainer'>
            <div className='coin-row'>
                <div className='coin'>
                    <img src={image} alt='crypto' />
                    <h1>{name}</h1>
                    <p className='coin-symbol'>{symbol}</p>
                </div>
            
                <div className='coin-data'>
                    <p className='coin-price'>€{price}</p>
                    <p className='coin-voume'>€{volume.toLocaleString()}</p>
                    {priceChange < 0 ? (<p className="coin-percent red"> {priceChange.toFixed(2)} </p> ) : (<p className="coin-percent green"> {priceChange.toFixed(2)} </p>)}
               
                <p className='coin-market-cap'>
                Mkt Cap: €{marketcap.toLocaleString()}
                </p>
                    </div>
            </div>
        </div>
    )
}