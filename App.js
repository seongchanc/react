import { useState, useEffect, useCallback } from 'react';
function App() {
  const [loading, setLoading] = useState(true);
  const [coins,setCoins] = useState([]);
  const [money,setMoney] = useState(0);
  const [getcoin,getCoin] = useState(0);

  const onChange = (event)=>{
    setMoney(event.target.value);
  }
  const get = (event)=> {
    getCoin(event.target.value)
    console.log(getcoin)
  }

  useEffect(()=>{
    fetch('https://api.coinpaprika.com/v1/tickers')
    .then((response)=>response.json())
    .then((json)=>{
      setCoins(json);
      setLoading(false);
    });
  },[])
  return (
    <div>
      <h1>The Coins!{coins.length}</h1>
    {loading ? <strong>Loading,,,</strong> :null}
    <select onChange={get}>
      <option>select your coin</option>
      {coins.map((coin)=>
        <option value={coin.quotes.USD.price}>{coin.name} ({coin.symbol}): ${coin.quotes.USD.price}USD</option>
      )}
    </select>
    <h1>enter your Assets</h1>
    <input type='number' onChange={onChange}></input>$
    <h1 style={{color: 'red'}}>you can buy {isNaN(money/getcoin) ? 0:money/getcoin} coin</h1>
    </div>
  );
}

export default App;
