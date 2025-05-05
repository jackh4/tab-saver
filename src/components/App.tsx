import './App.css'
import useChromeTabs from '../hooks/useChromeTabs'

function App() {
  const { chromeTabs, loading, error, refreshTabs } = useChromeTabs();

  return (
    <>
      <header>
        <button onClick={refreshTabs}>Refresh Tabs</button>
      </header>

      {loading && <p>Loading tabs...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {chromeTabs.map((tab, index) => (
          <li key={index}>
            <p>
              {tab.favIconUrl && (
                <img
                  src={tab.favIconUrl}
                  alt="favicon"
                  width="16"
                  height="16"
                  style={{ marginRight: '8px', verticalAlign: 'middle' }}
                />
              )}
              {tab.title}
            </p>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
