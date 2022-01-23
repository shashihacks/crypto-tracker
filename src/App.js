import React, { useState ,useRef, useEffect, useReducer} from 'react'
import axios from 'axios';
import './App.css';
import { useForm } from './components/useForm';
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
      console.log(response)
       setCoins(response.data)
   }).catch(err => {
     console.error(err)
   })
  }
  
  useEffect(()=> {
    console.log("Fetching updated data")
    getApiData()

    const interval =  setInterval(() => {
      getApiData();
      let today = new Date();
      let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      let dateTime = date+' '+time;
      setUpdatedTime(dateTime)
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
