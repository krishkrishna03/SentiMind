import { motion } from 'framer-motion'
import { FiCode, FiBarChart2, FiClock, FiBook } from 'react-icons/fi'

function About() {
  const features = [
    {
      icon: <FiBarChart2 size={24} />,
      title: "Sentiment Analysis",
      description: "Our advanced sentiment analysis engine evaluates the emotional tone of text, providing valuable insights into attitudes and opinions."
    },
    {
      icon: <FiClock size={24} />,
      title: "Real-time Processing",
      description: "Get instant feedback as you type, allowing you to quickly refine and understand the sentiment of your content."
    },
    {
      icon: <FiBook size={24} />,
      title: "History Tracking",
      description: "Save and review past analyses, making it easy to track sentiment trends over time or compare different text samples."
    },
    {
      icon: <FiCode size={24} />,
      title: "Detailed Breakdowns",
      description: "View comprehensive breakdowns of positive and negative language, with highlighted text to easily identify emotional triggers."
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl mx-auto"
    >
      <section className="mb-12">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-white mb-4">
            About SentiMind
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            SentiMind is a powerful tool designed to help you understand the emotional tone behind text. 
            Our advanced sentiment analysis technology evaluates content to reveal its underlying sentiment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg shadow-lg p-8 text-white"
        >
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <p className="mb-4">
            SentiMind uses natural language processing algorithms to analyze text and determine its emotional tone. 
            Our system evaluates various linguistic features, including:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>Word choice and emotional content</li>
            <li>Sentence structure and syntax</li>
            <li>Context and semantic meaning</li>
            <li>Intensity and emphasis</li>
          </ul>
          <p>
            These factors are combined to generate a comprehensive sentiment score that reflects the overall emotional tone of the text.
          </p>
        </motion.div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-white mb-6">
          Use Cases
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-neutral-800 dark:text-white mb-3">
              Customer Feedback
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              Analyze customer reviews and feedback to understand sentiment trends and identify areas for improvement.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-neutral-800 dark:text-white mb-3">
              Social Media Monitoring
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              Track sentiment across social media posts to gauge public perception and engagement with your brand.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-neutral-800 dark:text-white mb-3">
              Content Creation
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              Evaluate the emotional tone of your content to ensure it resonates with your target audience.
            </p>
          </motion.div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-white mb-6">
          Privacy & Security
        </h2>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 transition-all duration-300"
        >
          <p className="text-neutral-600 dark:text-neutral-300 mb-4">
            At SentiMind, we take your privacy seriously. All text analysis is performed locally in your browser, 
            and we do not store your analyzed text on our servers. Your analysis history is saved only in your local browser storage.
          </p>
          <p className="text-neutral-600 dark:text-neutral-300">
            You can clear your analysis history at any time from the History page.
          </p>
        </motion.div>
      </section>
    </motion.div>
  )
}

export default About