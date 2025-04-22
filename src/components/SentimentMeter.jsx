import { motion } from 'framer-motion'
import { useMemo } from 'react'

function SentimentMeter({ score }) {
  // Determine color and label based on score
  const { color, barColor, trackColor, label } = useMemo(() => {
    let colorObj = {
      color: 'text-neutral-500',
      barColor: 'bg-neutral-500',
      trackColor: 'bg-neutral-200 dark:bg-neutral-700',
      label: 'Neutral'
    }
    
    if (score >= 70) {
      colorObj = {
        color: 'text-positive-500',
        barColor: 'bg-positive-500',
        trackColor: 'bg-positive-100 dark:bg-positive-900/30',
        label: 'Very Positive'
      }
    } else if (score >= 60) {
      colorObj = {
        color: 'text-positive-400',
        barColor: 'bg-positive-400',
        trackColor: 'bg-positive-100 dark:bg-positive-900/30',
        label: 'Positive'
      }
    } else if (score <= 30) {
      colorObj = {
        color: 'text-negative-500',
        barColor: 'bg-negative-500',
        trackColor: 'bg-negative-100 dark:bg-negative-900/30',
        label: 'Very Negative'
      }
    } else if (score <= 40) {
      colorObj = {
        color: 'text-negative-400',
        barColor: 'bg-negative-400',
        trackColor: 'bg-negative-100 dark:bg-negative-900/30',
        label: 'Negative'
      }
    }
    
    return colorObj
  }, [score])

  return (
    <div className="flex flex-col items-center">
      <div className={`text-xl font-bold mb-1 ${color}`}>
        {score}
      </div>
      
      <div className="w-full h-4 rounded-full overflow-hidden relative mb-2">
        <div className={`absolute inset-0 ${trackColor}`}></div>
        <motion.div 
          className={`h-full ${barColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      
      <div className="flex justify-between w-full text-xs text-neutral-500 dark:text-neutral-400 mb-2">
        <span>Negative</span>
        <span>Neutral</span>
        <span>Positive</span>
      </div>
    </div>
  )
}

export default SentimentMeter