import React, { useState , useEffect } from 'react'
import axios from 'axios';
import './App.css';
import Coin from './components/Coin';



function App() {

  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')
  const [nextPage, setNextPage] = useState(1)
  const [numberOfCoins, setNumberOfCoins] = useState(10)
  let URL =  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=EUR&order=market_cap_desc&per_page=${numberOfCoins}&page=${nextPage}&sparkline=false`


  const [updatedTime, setUpdatedTime] = useState('')
  
  const  getApiData = () => {
    axios.get(URL).then(response => {
       setCoins(response.data)
   }).catch(err => {
     console.error(err)
   })
  }
  
  useEffect(()=> {
    getApiData()

    const interval =  setInterval(() => {
      getApiData();
      let d = new Date();
      let datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
      d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
      setUpdatedTime(datestring)
    }, 3000)

    return () => clearInterval(interval)
  },[URL])


  const handleChange = e => {
    setSearch(e.target.value)
  }
  let filteredCoins = coins.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()))
 

    return (
    <div className='App'>
     <div className="coin-search">
      <h1 className='coin-text'> Search a currency</h1>
      <form>
        <input type='text'  placeholder='Search' className='coin-input' onChange={handleChange}></input>
      </form>

      <p className='last-updated'>Last updated: {updatedTime} </p>
    </div>

    <div className='coin-cointainer'>
    <div className='coin-row'>
      <div className='coin'> 
          <h2 >&nbsp;</h2> 
          <h1>Name</h1>
          <p className='coin-symbol'>Symbol</p>
      </div>

        <div div className='coin-data'>
            <p className='coin-price'>Price</p>
            <p className='coin-voume'>24h Volume</p>
            <p className='coin-percent'>Price Change</p>
            <p className='coin-market-cap'>   Market Cap    </p>
          </div>
    </div>

</div>

    {filteredCoins.map(coin => {
      return (
      <Coin 
        key={coin.id} 
        name={coin.name} 
        price={coin.current_price} 
        image={coin.image}
        symbol={coin.symbol}
        volume={coin.total_volume}
        priceChange={coin.price_change_percentage_24h}
        marketcap={coin.market_cap}
       ></Coin>
      )
    })}

    <div className='helpers'>
      <button className='next-page'  onClick={() => setNextPage(oldPageNumber => oldPageNumber + 1 )}>Next page</button>

    </div>
    <div className='controllers'>
  
    <button className='show-more'  onClick={() => setNumberOfCoins(oldCoinCount => oldCoinCount + 10 )}>Show more</button>
    </div>
    </div>

  )
}

export default App;
