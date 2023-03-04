import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { useGeolocated } from "react-geolocated";
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const { isGeolocationAvailable, isGeolocationEnabled, coords } = useGeolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    watchPosition: true,
    userDecisionTimeout: 15000,
});

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => {setCount((count) => count + 1);}}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <p>
          {JSON.stringify({isGeolocationAvailable, isGeolocationEnabled, speed: coords?.speed * 3.6}, null, 2)}
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
