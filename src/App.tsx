import { useState } from 'react'
import './App.css'

function App() {
  const [tabs, setTabs] = useState<chrome.tabs.Tab[]>([])

  const onClick = async () => {
    if (chrome && chrome.tabs) {
      chrome.tabs.query({}, (result) => {
        setTabs(result)
      })
    } else {
      console.error('chrome.tabs API is not available')
    }
  }

  return (
    <>
    <div>
        <button onClick={onClick}>Get Links</button>
      </div>
      <ul>
        {tabs.map((tab, index) => (
          <li key={index}>
            <a href={tab.url} target="_blank" rel="noopener noreferrer">
              {tab.title}
            </a>
          </li>
        ))}
      </ul>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
