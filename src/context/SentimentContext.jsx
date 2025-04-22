import { createContext, useContext, useState, useEffect } from 'react'

const SentimentContext = createContext()

export function useSentiment() {
  return useContext(SentimentContext)
}

export function SentimentProvider({ children }) {
  const [history, setHistory] = useState([])
  
  // Load history from localStorage on initial render
  useEffect(() => {
    const savedHistory = localStorage.getItem('sentimentHistory')
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory))
      } catch (error) {
        console.error('Error parsing history:', error)
        setHistory([])
      }
    }
  }, [])
  
  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sentimentHistory', JSON.stringify(history))
  }, [history])
  
  const addToHistory = (analysis) => {
    const analysisWithTimestamp = {
      ...analysis,
      timestamp: new Date().toISOString(),
      id: Date.now().toString()
    }
    setHistory(prev => [analysisWithTimestamp, ...prev])
  }
  
  const clearHistory = () => {
    setHistory([])
  }
  
  const removeFromHistory = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id))
  }
  
  const value = {
    history,
    addToHistory,
    clearHistory,
    removeFromHistory
  }
  
  return (
    <SentimentContext.Provider value={value}>
      {children}
    </SentimentContext.Provider>
  )
}