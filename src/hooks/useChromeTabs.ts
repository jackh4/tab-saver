import { useEffect, useState } from 'react'

export default function useChromeTabs() {
  const [chromeTabs, setChromeTabs] = useState<chrome.tabs.Tab[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTabs = () => {
    if (typeof chrome !== 'undefined' && chrome?.tabs) {
      chrome.tabs.query({}, (result) => {
        setChromeTabs(result)
        setLoading(false)
      })
    } else {
      setError('chrome.tabs API is not available')
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchTabs()
  }, [])

  return { chromeTabs, loading, error, refreshTabs: fetchTabs }
}