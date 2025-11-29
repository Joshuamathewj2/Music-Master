# Music Master Flashcards

A web-based music theory flashcard application for learning scales, circle of fifths, and scale progressions.

## Features

- **Scale Flashcards**: Interactive flashcards for major and minor scales with flip animations
- **Circle of Fifths Trainer**: Practice questions for the circle of fifths/fourths
- **Scale Progression Quiz**: Question bank for scale progression knowledge
- **Shuffle Mode**: Randomize flashcard order for varied practice
- **Progress Tracking**: LocalStorage integration to save your progress across sessions
- **Flip Animations**: Smooth 3D card flip animations
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
Music/
├── index.html                 # Main entry point
├── css/
│   ├── main.css              # Global styles, layout, typography
│   ├── flashcard.css         # Flashcard component styles
│   ├── navigation.css        # Navigation menu styles
│   └── animations.css        # Flip animations and transitions
├── js/
│   ├── main.js               # App initialization and routing
│   ├── flashcard.js          # Flashcard component logic
│   ├── circleOfFifths.js     # Circle of fifths trainer
│   ├── scaleProgression.js  # Scale progression question bank
│   ├── storage.js            # LocalStorage utility
│   └── utils.js              # Helper functions (shuffle, etc.)
└── README.md                  # This file
```

## Getting Started

1. Open `index.html` in a web browser
2. Navigate between different modes using the top navigation
3. Customize the content by adding your scale data and questions

## Customization

### Adding Scale Data

In `js/flashcard.js`, replace the empty `scaleData` array with your scale data:

```javascript
this.scaleData = [
    {
        id: 'c-major',
        root: 'C',
        type: 'major',
        notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B']
    },
    // Add more scales...
];
```

Then call `flashcardManager.setScaleData(yourDataArray)` in `main.js` or after initialization.

### Adding Circle of Fifths Data

In `js/circleOfFifths.js`, update the `circleNotes` array:

```javascript
this.circleNotes = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F'];
```

### Adding Question Bank

In `js/scaleProgression.js`, replace the empty `questionBank` array:

```javascript
this.questionBank = [
    {
        id: 'q1',
        question: 'What is the relative minor of C major?',
        correctAnswer: 'A minor',
        options: ['A minor', 'E minor', 'D minor', 'G minor'],
        explanation: 'A minor is the relative minor of C major...'
    },
    // Add more questions...
];
```

Then call `scaleProgressionQuiz.setQuestionBank(yourQuestionsArray)`.

## Data Structures

### Scale Object
```javascript
{
    id: 'unique-id',        // Unique identifier
    root: 'C',              // Root note
    type: 'major',          // Scale type (major, minor, etc.)
    notes: ['C', 'D', ...]  // Array of notes in the scale
}
```

### Question Object
```javascript
{
    id: 'unique-id',                    // Unique identifier
    question: 'Question text?',         // Question text
    correctAnswer: 'Correct Answer',    // Correct answer
    options: ['Option 1', ...],        // Array of answer options
    explanation: 'Explanation text'    // Optional explanation
}
```

## Browser Support

- Modern browsers with ES6+ support
- LocalStorage support required for progress tracking
- CSS 3D transforms for flip animations

## LocalStorage

Progress is saved in LocalStorage under the key `musicMasterFlashcards`. The data structure includes:

- Scales: current index, shuffle mode, completed cards
- Circle of Fifths: score, total attempts, correct answers
- Scale Progression: score, total questions, correct answers, completed questions

To reset progress, use the browser's developer console:
```javascript
localStorage.removeItem('musicMasterFlashcards');
```

## License

This project is open source and available for customization.

