/**
 * Circle of Fifths Trainer
 * Handles circle of fifths training questions and answers
 */

class CircleOfFifthsTrainer {
    constructor() {
        this.score = 0;
        this.totalAttempts = 0;
        this.correctAnswers = 0;
        this.currentQuestion = null;
        this.answerOptions = [];
        
        // TODO: Replace with actual circle of fifths data
        // Expected format: Array of note names in circle of fifths order
        this.circleNotes = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F'];
        
        this.init();
    }

    init() {
        this.loadProgress();
        this.render();
        this.attachEventListeners();
    }

    loadProgress() {
        const progress = getSectionProgress('circleOfFifths');
        this.score = progress.score || 0;
        this.totalAttempts = progress.totalAttempts || 0;
        this.correctAnswers = progress.correctAnswers || 0;
        this.updateScoreDisplay();
    }

    saveProgress() {
        updateProgress('circleOfFifths', {
            score: this.score,
            totalAttempts: this.totalAttempts,
            correctAnswers: this.correctAnswers
        });
    }

    /**
     * Generate a new question
     */
    generateQuestion() {
        // TODO: Customize question types based on your needs
        // Example: "What comes after C in the circle of fifths?"
        const randomNote = getRandomElement(this.circleNotes);
        const noteIndex = this.circleNotes.indexOf(randomNote);
        const nextNote = this.circleNotes[(noteIndex + 1) % this.circleNotes.length];
        
        this.currentQuestion = {
            type: 'next_in_circle',
            question: `What comes after ${randomNote} in the circle of fifths?`,
            correctAnswer: nextNote,
            currentNote: randomNote
        };

        this.generateAnswerOptions();
        this.render();
    }

    /**
     * Generate answer options (correct answer + distractors)
     */
    generateAnswerOptions() {
        const correct = this.currentQuestion.correctAnswer;
        const allNotes = [...this.circleNotes];
        
        // Remove correct answer from options
        const otherNotes = allNotes.filter(note => note !== correct);
        
        // Get 3 random wrong answers
        const wrongAnswers = getRandomElements(otherNotes, 3);
        
        // Combine and shuffle
        this.answerOptions = shuffleArray([correct, ...wrongAnswers]);
    }

    /**
     * Handle answer selection
     * @param {string} selectedAnswer - The selected answer
     */
    handleAnswer(selectedAnswer) {
        if (!this.currentQuestion) return;

        const isCorrect = selectedAnswer === this.currentQuestion.correctAnswer;
        this.totalAttempts++;
        
        if (isCorrect) {
            this.correctAnswers++;
            this.score++;
        }

        this.showFeedback(isCorrect, selectedAnswer);
        this.saveProgress();
        this.updateScoreDisplay();

        // Disable all buttons
        const buttons = document.querySelectorAll('#circle-answers .answer-btn');
        buttons.forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === this.currentQuestion.correctAnswer) {
                btn.classList.add('correct');
            } else if (btn.textContent === selectedAnswer && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });

        // Generate new question after delay
        setTimeout(() => {
            this.generateQuestion();
        }, 2000);
    }

    showFeedback(isCorrect, selectedAnswer) {
        const feedbackEl = document.getElementById('circle-feedback');
        if (feedbackEl) {
            feedbackEl.textContent = isCorrect 
                ? `Correct! ${this.currentQuestion.correctAnswer} comes after ${this.currentQuestion.currentNote}.`
                : `Incorrect. The correct answer is ${this.currentQuestion.correctAnswer}.`;
            feedbackEl.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        }
    }

    updateScoreDisplay() {
        const scoreEl = document.getElementById('circle-score');
        if (scoreEl) {
            scoreEl.textContent = this.score;
        }
    }

    render() {
        const questionEl = document.getElementById('circle-question');
        const answersEl = document.getElementById('circle-answers');

        if (!questionEl || !answersEl) return;

        if (!this.currentQuestion) {
            this.generateQuestion();
            return;
        }

        questionEl.textContent = this.currentQuestion.question;

        answersEl.innerHTML = this.answerOptions.map(answer => 
            `<button class="answer-btn" data-answer="${answer}">${answer}</button>`
        ).join('');

        // Clear feedback
        const feedbackEl = document.getElementById('circle-feedback');
        if (feedbackEl) {
            feedbackEl.textContent = '';
            feedbackEl.className = 'feedback';
        }
    }

    attachEventListeners() {
        // Use event delegation for dynamically created buttons
        const answersContainer = document.getElementById('circle-answers');
        if (answersContainer) {
            answersContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('answer-btn') && !e.target.disabled) {
                    const answer = e.target.getAttribute('data-answer');
                    this.handleAnswer(answer);
                }
            });
        }
    }

    reset() {
        this.score = 0;
        this.totalAttempts = 0;
        this.correctAnswers = 0;
        this.saveProgress();
        this.updateScoreDisplay();
        this.generateQuestion();
    }
}

// Global instance (will be initialized in main.js)
let circleOfFifthsTrainer = null;

