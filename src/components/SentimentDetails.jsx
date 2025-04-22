import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

function SentimentDetails({ analysis }) {
  const [expanded, setExpanded] = useState(false)

  if (!analysis) return null

  // Process the text to highlight sentiment words
  const renderHighlightedText = () => {
    if (!analysis.highlightedText) return analysis.originalText

    return analysis.highlightedText.map((item, index) => {
      let className = ''
      if (item.type === 'positive') {
        className = 'px-1 bg-positive-100 dark:bg-positive-900/30 text-positive-700 dark:text-positive-300 rounded'
      } else if (item.type === 'negative') {
        className = 'px-1 bg-negative-100 dark:bg-negative-900/30 text-negative-700 dark:text-negative-300 rounded'
      }

      return (
        <span key={index} className={className}>
          {item.word}{' '}
        </span>
      )
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-white">Detailed Analysis</h3>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
        >
          {expanded ? (
            <>
              <span className="mr-1 text-sm">Less Details</span>
              <FiChevronUp size={18} />
            </>
          ) : (
            <>
              <span className="mr-1 text-sm">More Details</span>
              <FiChevronDown size={18} />
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
          <h4 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">Confidence</h4>
          <div className="flex items-center">
            <div className="text-2xl font-bold text-neutral-800 dark:text-white">{analysis.confidence}%</div>
          </div>
        </div>

        <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
          <h4 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">Positive Words</h4>
          <div className="text-2xl font-bold text-positive-500">{analysis.positive.length}</div>
        </div>

        <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
          <h4 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">Negative Words</h4>
          <div className="text-2xl font-bold text-negative-500">{analysis.negative.length}</div>
        </div>
      </div>

      <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 mb-4">
        <h4 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2">Analyzed Text with Highlights</h4>
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
          {renderHighlightedText()}
        </p>
      </div>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
              <h4 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2">Positive Words</h4>
              {analysis.positive.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {analysis.positive.map((word, index) => (
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
              {analysis.negative.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {analysis.negative.map((word, index) => (
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

          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
            <h4 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2">Raw Sentiment Data</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Raw Score</p>
                <p className="text-neutral-800 dark:text-neutral-200">{analysis.score}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Comparative Score</p>
                <p className="text-neutral-800 dark:text-neutral-200">{analysis.comparative.toFixed(3)}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Word Count</p>
                <p className="text-neutral-800 dark:text-neutral-200">{analysis.tokens.length}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Normalized Score</p>
                <p className="text-neutral-800 dark:text-neutral-200">{analysis.normalizedScore}/100</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default SentimentDetails