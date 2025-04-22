import { motion } from 'framer-motion'
import SentimentAnalyzer from '../components/SentimentAnalyzer'

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <section className="mb-10">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-white mb-4">
            Discover the Emotional Tone of Your Text
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Our advanced sentiment analysis tool helps you understand the emotional tone 
            behind your text. Perfect for analyzing customer feedback, social media posts, 
            and more.
          </p>
        </motion.div>
        
        <SentimentAnalyzer />
      </section>
    </motion.div>
  )
}

export default Home