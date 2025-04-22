import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiTrash2, FiX, FiAlertCircle } from 'react-icons/fi'
import { useSentiment } from '../context/SentimentContext'
import SentimentMeter from '../components/SentimentMeter'

function History() {
  const { history, clearHistory, removeFromHistory } = useSentiment()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const handleClearHistory = () => {
    setShowConfirmation(true)
  }

  const confirmClearHistory = () => {
    clearHistory()
    setShowConfirmation(false)
  }

  const cancelClearHistory = () => {
    setShowConfirmation(false)
  }

  const openDetails = (item) => {
    setSelectedItem(item)
  }

  const closeDetails = () => {
    setSelectedItem(null)
  }

  // Format timestamp to readable date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  // Extract a brief preview from the text
  const getTextPreview = (text, maxLength = 100) => {
    if (!text) return ''
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-white">
          Analysis History
        </h2>
        {history.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="px-4 py-2 rounded-md bg-negative-500 hover:bg-negative-600 text-white transition-colors duration-200"
          >
            Clear All
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 text-neutral-300 dark:text-neutral-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-200 mb-2">
            No History Yet
          </h3>
          <p className="text-neutral-500 dark:text-neutral-400">
            Your analysis history will appear here once you've analyzed some text.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence>
            {history.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                layout
                className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-1 mb-4 md:mb-0 md:mr-4">
                    <div className="flex justify-between mb-2">
                      <div className="text-xs text-neutral-500 dark:text-neutral-400">
                        {formatDate(item.timestamp)}
                      </div>
                      <button
                        onClick={() => removeFromHistory(item.id)}
                        className="text-neutral-400 hover:text-negative-500 transition-colors duration-200"
                        aria-label="Remove from history"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                    <p className="text-neutral-700 dark:text-neutral-300 mb-2 line-clamp-2">
                      {getTextPreview(item.originalText)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${item.emotionalTone.includes('positive') 
                          ? 'bg-positive-100 dark:bg-positive-900/30 text-positive-800 dark:text-positive-300'
                          : item.emotionalTone.includes('negative') 
                            ? 'bg-negative-100 dark:bg-negative-900/30 text-negative-800 dark:text-negative-300'
                            : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-300'
                        }`}
                      >
                        {item.emotionalTone}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300">
                        {item.confidence}% confidence
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center md:ml-4">
                    <div className="w-32 mb-2 md:mb-0 md:mr-4">
                      <SentimentMeter score={item.normalizedScore} />
                    </div>
                    <button
                      onClick={() => openDetails(item)}
                      className="w-full md:w-auto px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md transition-colors duration-200"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl p-6 max-w-md w-full"
            >
              <div className="flex items-center mb-4 text-negative-500">
                <FiAlertCircle size={24} className="mr-2" />
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-white">
                  Clear History
                </h3>
              </div>
              <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                Are you sure you want to clear your entire analysis history? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={cancelClearHistory}
                  className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmClearHistory}
                  className="px-4 py-2 bg-negative-500 hover:bg-negative-600 text-white rounded-md transition-colors duration-200"
                >
                  Clear All
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-white">
                  Analysis Details
                </h3>
                <button
                  onClick={closeDetails}
                  className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                  Analyzed on {formatDate(selectedItem.timestamp)}
                </p>
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 mb-4">
                  <h4 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2">Original Text</h4>
                  <p className="text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">
                    {selectedItem.originalText}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">Score</h4>
                  <div className="text-2xl font-bold text-neutral-800 dark:text-white">
                    {selectedItem.normalizedScore}/100
                  </div>
                </div>
                
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">Tone</h4>
                  <div className={`text-2xl font-bold
                    ${selectedItem.emotionalTone.includes('positive') 
                      ? 'text-positive-500'
                      : selectedItem.emotionalTone.includes('negative') 
                        ? 'text-negative-500'
                        : 'text-neutral-500'
                    }`}
                  >
                    {selectedItem.emotionalTone}
                  </div>
                </div>
                
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">Confidence</h4>
                  <div className="text-2xl font-bold text-primary-500">{selectedItem.confidence}%</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2">Positive Words</h4>
                  {selectedItem.positive.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.positive.map((word, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-positive-100 dark:bg-positive-900/30 text-positive-700 dark:text-positive-300 rounded-full text-sm"
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm">No positive words detected</p>
                  )}
                </div>
                
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2">Negative Words</h4>
                  {selectedItem.negative.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.negative.map((word, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-negative-100 dark:bg-negative-900/30 text-negative-700 dark:text-negative-300 rounded-full text-sm"
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm">No negative words detected</p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default History