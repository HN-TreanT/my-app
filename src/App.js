import logo from './logo.svg';
import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Greeting from './Greeting';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import News from './News';
import Home from './Home';
import axios from 'axios'
import { createContext } from 'react';
export const ThemeContext = createContext()


function App() {
  const [count, setCount] = useState(0)
  // const [data, setData] = useState([])
  // useEffect(() => {
  //   console.log("mout")
  //   fetch('https://nckh.onrender.com/api/post?page=1&size=10&search=hds')
  //   .then((res) => res.json())
  //   .then(post => {
  //       // console.log(post)
  //       setData(post.data.data)
  //   })
  
  // }, [count])

     const fetcData = async () => {
         const res = await axios.get("https://pokeapi.co/api/v2/pokemon/ditto");
        // setData(res)
     }

    useEffect(() => {
      fetcData()
    })

  const handleClick = useCallback( () => {
    setCount(pre => pre + 1)
  }, [])
  return (
    <ThemeContext.Provider value={"Hoang Nam"}>
           <div className="App">
              <Greeting handleClick = {handleClick}/>
              <div>{count}</div>
              {/* <button onClick={() => setCount(count + 1)}>Click</button> */}
            </div>
            <ul>
               <li>
                  <a href='/'>Home</a>
               </li>
               <li>
                  <a href='/news'>News</a>
               </li>
            </ul>
            <Routes>
                 <Route path='/' element={<Home/>}></Route>
                 <Route path='/news' element={<News/>}></Route>
            </Routes>
    </ThemeContext.Provider>
  );
}

export default App;
