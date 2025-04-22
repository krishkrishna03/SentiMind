import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiTrash2, FiRefreshCw, FiCopy } from 'react-icons/fi'
import { analyzeSentiment } from '../utils/sentimentAnalyzer'
import { useSentiment } from '../context/SentimentContext'
import SentimentMeter from './SentimentMeter'
import SentimentDetails from './SentimentDetails'

function SentimentAnalyzer() {
  const [text, setText] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [copied, setCopied] = useState(false)
  const { addToHistory } = useSentiment()

  // Analyze the text when it changes (debounced)
  useEffect(() => {
    if (!text || text.trim() === '') {
      setAnalysis(null)
      return
    }

    const timeoutId = setTimeout(() => {
      setIsAnalyzing(true)
      // Simulate a slight delay for the analysis to feel more substantial
      setTimeout(() => {
        const result = analyzeSentiment(text)
        setAnalysis(result)
        setIsAnalyzing(false)
      }, 500)
    }, 800)

    return () => clearTimeout(timeoutId)
  }, [text])

  const handleTextChange = (e) => {
    setText(e.target.value)
  }

  const handleClear = () => {
    setText('')
    setAnalysis(null)
  }

  const handleSave = () => {
    if (analysis) {
      addToHistory(analysis)
      // Show a brief confirmation
      const notification = document.getElementById('save-notification')
      notification.classList.add('opacity-100')
      setTimeout(() => {
        notification.classList.remove('opacity-100')
      }, 2000)
    }
  }

  const handleCopyResults = () => {
    if (!analysis) return

    const resultText = `
Sentiment Analysis Results:
- Score: ${analysis.normalizedScore}/100
- Tone: ${analysis.emotionalTone}
- Confidence: ${analysis.confidence}%
- Positive Words: ${analysis.positive.join(', ')}
- Negative Words: ${analysis.negative.join(', ')}
- Summary: ${analysis.summary}
    `.trim()

    navigator.clipboard.writeText(resultText).then(
      () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      },
      (err) => {
        console.error('Could not copy text: ', err)
      }
    )
  }

  const exampleTexts = [
    "I absolutely love this product! It's amazing and works perfectly.",
    "This is the worst experience I've ever had. Everything went wrong.",
    "The weather is nice today. I'm going to the store later to buy groceries."
  ]

  const loadExample = (index) => {
    setText(exampleTexts[index])
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-white mb-2">
          Sentiment Analysis
        </h2>
        <p className="text-neutral-600 dark:text-neutral-300">
          Enter text below to analyze its emotional tone and sentiment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4 transition-all duration-300">
            <div className="flex justify-between items-center mb-3">
              <label htmlFor="text-input" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Your Text
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={handleClear}
                  disabled={!text}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    text
                      ? 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                      : 'text-neutral-400 dark:text-neutral-600 cursor-not-allowed'
                  }`}
                  aria-label="Clear text"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
            <textarea
              id="text-input"
              value={text}
              onChange={handleTextChange}
              placeholder="Type or paste your text here to analyze sentiment..."
              className="w-full h-64 p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
            />

            <div className="mt-3 flex flex-wrap justify-between items-center">
              <div className="flex flex-wrap gap-2 mt-2">
                <button
                  onClick={() => loadExample(0)}
                  className="text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 px-3 py-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors duration-200"
                >
                  Positive Example
                </button>
                <button
                  onClick={() => loadExample(1)}
                  className="text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 px-3 py-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors duration-200"
                >
                  Negative Example
                </button>
                <button
                  onClick={() => loadExample(2)}
                  className="text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 px-3 py-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors duration-200"
                >
                  Neutral Example
                </button>
              </div>
              <div className="mt-2">
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  {text ? `${text.length} characters` : 'Enter some text to begin'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <AnimatePresence mode="wait">
            {isAnalyzing ? (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4 h-full flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 border-4 border-neutral-200 dark:border-neutral-700 border-t-primary-500 rounded-full animate-spin mb-4"></div>
                <p className="text-neutral-600 dark:text-neutral-300">Analyzing sentiment...</p>
              </motion.div>
            ) : analysis ? (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4 h-full flex flex-col"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-neutral-800 dark:text-white">Results</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleCopyResults}
                      className="p-2 rounded-md text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
                      aria-label="Copy results"
                    >
                      <FiCopy size={18} />
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-3 py-1 rounded-md bg-primary-500 hover:bg-primary-600 text-white text-sm transition-colors duration-200"
                    >
                      Save
                    </button>
                  </div>
                </div>

                <SentimentMeter score={analysis.normalizedScore} />

                <div className="mt-4">
                  <p className="text-center text-lg font-medium mb-2 text-neutral-800 dark:text-white">
                    {analysis.emotionalTone.charAt(0).toUpperCase() + analysis.emotionalTone.slice(1)}
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 text-center">
                    {analysis.summary}
                  </p>
                </div>

                <div 
                  id="save-notification" 
                  className="mt-4 bg-positive-100 dark:bg-positive-900 text-positive-800 dark:text-positive-200 px-3 py-2 rounded-md text-sm text-center opacity-0 transition-opacity duration-300"
                >
                  Analysis saved to history!
                </div>

                <div 
                  className={`mt-4 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-3 py-2 rounded-md text-sm text-center transition-opacity duration-300 ${copied ? 'opacity-100' : 'opacity-0'}`}
                >
                  Results copied to clipboard!
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4 h-full flex flex-col items-center justify-center text-center"
              >
                <div className="w-16 h-16 mb-4 text-neutral-300 dark:text-neutral-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-neutral-600 dark:text-neutral-300">Enter text to see sentiment analysis results</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {analysis && !isAnalyzing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 transition-all duration-300"
        >
          <SentimentDetails analysis={analysis} />
        </motion.div>
      )}
    </div>
  )
}

export default SentimentAnalyzer