# SentiMind - Advanced Sentiment Analysis Tool

SentiMind is a modern web application that analyzes the emotional tone of text using advanced sentiment analysis. Built with React and powered by natural language processing, it provides real-time feedback on the emotional content of your text.

![SentiMind Screenshot](https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)

## Features

- **Real-time Analysis**: Get instant feedback as you type
- **Detailed Breakdowns**: View comprehensive analysis of positive and negative language
- **Visual Metrics**: Interactive sentiment meter and confidence scores
- **History Tracking**: Save and review past analyses
- **Dark Mode**: Comfortable viewing in any lighting condition
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technology Stack

- **Frontend Framework**: React 18
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Sentiment Analysis**: Sentiment.js
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sentiment-analysis-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Basic Analysis
1. Navigate to the "Analyze" page
2. Enter or paste your text in the input area
3. View real-time sentiment analysis results
4. Save interesting results to your history

### History Management
- View past analyses in the "History" page
- Click "View Details" for comprehensive breakdowns
- Clear individual entries or entire history
- Export results for further analysis

### Example Use Cases

- **Content Creation**: Evaluate the emotional tone of your writing
- **Customer Feedback**: Analyze customer reviews and comments
- **Social Media**: Monitor sentiment in social media posts
- **Market Research**: Gauge public opinion and reactions

## Project Structure

```
sentiment-analysis-app/
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── context/           # React context providers
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Main application component
│   └── main.jsx          # Application entry point
├── public/                # Static assets
└── package.json          # Project dependencies
```

## Key Components

### SentimentAnalyzer
- Core analysis component
- Real-time text processing
- Visual feedback and metrics

### SentimentMeter
- Interactive visualization
- Score representation
- Color-coded feedback

### History Management
- Local storage integration
- Detailed analysis records
- Export capabilities

## Customization

### Theme Configuration
The application supports both light and dark modes. Colors can be customized in:
- `tailwind.config.js`: Theme colors and extensions
- `index.css`: Root CSS variables

### Sentiment Analysis
Adjust sentiment analysis parameters in `utils/sentimentAnalyzer.js`:
- Scoring thresholds
- Confidence calculations
- Summary generation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Sentiment](https://www.npmjs.com/package/sentiment) for text analysis
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations
- [React Icons](https://react-icons.github.io/react-icons/) for iconography
