import Sentiment from 'sentiment'

const sentiment = new Sentiment()

export const analyzeSentiment = (text) => {
  if (!text || text.trim() === '') {
    return {
      score: 0,
      comparative: 0,
      tokens: [],
      positive: [],
      negative: [],
      calculation: [],
      normalizedScore: 50, // Neutral score
      emotionalTone: 'neutral',
      confidence: 0
    }
  }

  const result = sentiment.analyze(text)
  
  // Add some extra properties
  const normalized = normalizeScore(result.comparative)
  
  let emotionalTone = 'neutral'
  if (normalized > 65) emotionalTone = 'very positive'
  else if (normalized > 55) emotionalTone = 'positive'
  else if (normalized < 35) emotionalTone = 'very negative'
  else if (normalized < 45) emotionalTone = 'negative'
  
  // Calculate a fake confidence score based on text length and sentiment strength
  const confidence = calculateConfidence(text.length, Math.abs(result.comparative))
  
  // Highlight positive and negative words in the original text
  const highlightedText = highlightSentimentWords(text, result.positive, result.negative)
  
  // Generate a brief summary
  const summary = generateSummary(emotionalTone, result.positive.length, result.negative.length)
  
  return {
    ...result,
    normalizedScore: normalized,
    emotionalTone,
    confidence,
    highlightedText,
    summary,
    originalText: text
  }
}

// Convert the comparative score (which can be negative) to a 0-100 scale
const normalizeScore = (comparative) => {
  // This formula converts scores roughly from the range [-5, 5] to [0, 100]
  // You may need to adjust based on your data
  const normalized = (comparative + 5) * 10
  return Math.min(Math.max(Math.round(normalized), 0), 100)
}

const calculateConfidence = (textLength, sentimentStrength) => {
  // Simple heuristic: longer text with stronger sentiment = higher confidence
  let confidence = Math.min(textLength / 200, 1) * 0.7 // Max 70% from length
  confidence += Math.min(sentimentStrength * 10, 30) / 100 // Max 30% from strength
  return Math.min(Math.round(confidence * 100), 100)
}

const highlightSentimentWords = (text, positiveWords, negativeWords) => {
  // For a real implementation, you would need a more sophisticated approach
  // This is just a simple version that works for exact matches
  
  const words = text.split(/\s+/)
  const highlightedWords = words.map(word => {
    const cleanWord = word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    
    if (positiveWords.includes(cleanWord)) {
      return { word, type: 'positive' }
    } else if (negativeWords.includes(cleanWord)) {
      return { word, type: 'negative' }
    }
    return { word, type: 'neutral' }
  })
  
  return highlightedWords
}

const generateSummary = (tone, positiveCount, negativeCount) => {
  let summary = `The text has an overall ${tone} tone.`
  
  if (positiveCount > 0 || negativeCount > 0) {
    summary += ` It contains ${positiveCount} positive ${positiveCount === 1 ? 'term' : 'terms'} and ${negativeCount} negative ${negativeCount === 1 ? 'term' : 'terms'}.`
  }
  
  return summary
}