/**
 * Scale Progression Question Bank
 * Handles scale progression quiz questions and progress tracking
 */

class ScaleProgressionQuiz {
    constructor() {
        this.score = 0;
        this.totalQuestions = 0;
        this.correctAnswers = 0;
        this.currentQuestion = null;
        this.currentQuestionIndex = 0;
        this.answerOptions = [];
        this.completedQuestions = [];
        
        // TODO: Replace with actual question bank data
        // Expected format: [{ id: 'q1', question: '...', correctAnswer: '...', options: [...] }, ...]
        this.questionBank = [
            {
                id: "q1",
                question: "What is the relative minor of C major?",
                options: ["A minor", "E minor", "D minor", "G minor"],
                correctAnswer: "A minor",
                explanation: "The relative minor is the 6th degree: A."
            },
            {
                id: "q2",
                question: "What is the tonic of G major?",
                options: ["G", "A", "D", "C"],
                correctAnswer: "G",
                explanation: "The tonic is the 1st scale degree."
            },
            {
                id: "q3",
                question: "How many sharps are in the key of A major?",
                options: ["2", "3", "4", "1"],
                correctAnswer: "3",
                explanation: "A major has F#, C#, G#."
            },
            {
                id: "q4",
                question: "What is the relative major of E minor?",
                options: ["G major", "A major", "D major", "F major"],
                correctAnswer: "G major",
                explanation: "Relative major is 3 semitones higher."
            },
            {
                id: "q5",
                question: "What comes after D in the circle of fifths?",
                options: ["A", "G", "E", "F"],
                correctAnswer: "A",
                explanation: "D → A is one perfect fifth upward."
            },
            {
                id: "q6",
                question: "Which scale degree is the dominant?",
                options: ["5th", "4th", "3rd", "7th"],
                correctAnswer: "5th",
                explanation: "Dominant = degree 5."
            },
            {
                id: "q7",
                question: "What is the relative minor of G major?",
                options: ["E minor", "A minor", "D minor", "B minor"],
                correctAnswer: "E minor",
                explanation: "6th degree of G major = E."
            },
            {
                id: "q8",
                question: "Which major scale has 2 sharps?",
                options: ["D major", "G major", "A major", "E major"],
                correctAnswer: "D major",
                explanation: "D major = F#, C#."
            },
            {
                id: "q9",
                question: "Which major scale has 1 flat?",
                options: ["F major", "Bb major", "Eb major", "C major"],
                correctAnswer: "F major",
                explanation: "F major has Bb."
            },
            {
                id: "q10",
                question: "What is the relative major of D minor?",
                options: ["F major", "G major", "Bb major", "C major"],
                correctAnswer: "F major",
                explanation: "D minor's relative major is F."
            },
            {
                id: "q11",
                question: "What is the 3rd degree of the C major scale?",
                options: ["E", "D", "G", "F"],
                correctAnswer: "E",
                explanation: "C-D-E (third)."
            },
            {
                id: "q12",
                question: "Which scale has 5 sharps?",
                options: ["B major", "E major", "A major", "C# major"],
                correctAnswer: "B major",
                explanation: "B major = F# C# G# D# A#."
            },
            {
                id: "q13",
                question: "What is the relative minor of F major?",
                options: ["D minor", "C minor", "A minor", "G minor"],
                correctAnswer: "D minor",
                explanation: "F → D is relative minor."
            },
            {
                id: "q14",
                question: "Which scale has 3 flats?",
                options: ["Eb major", "Ab major", "Bb major", "Db major"],
                correctAnswer: "Eb major",
                explanation: "Eb major = Bb, Eb, Ab."
            },
            {
                id: "q15",
                question: "What comes before F in the circle of fifths?",
                options: ["Bb", "C", "G", "Eb"],
                correctAnswer: "Bb",
                explanation: "F → Bb is a perfect fifth downward."
            },
            {
                id: "q16",
                question: "What is the leading tone of G major?",
                options: ["F#", "E", "A", "D"],
                correctAnswer: "F#",
                explanation: "7th degree = leading tone."
            },
            {
                id: "q17",
                question: "Which major key has no sharps or flats?",
                options: ["C major", "F major", "G major", "D major"],
                correctAnswer: "C major",
                explanation: "C major is natural."
            },
            {
                id: "q18",
                question: "What is the relative minor of Bb major?",
                options: ["G minor", "F minor", "D minor", "A minor"],
                correctAnswer: "G minor",
                explanation: "6th degree of Bb = G."
            },
            {
                id: "q19",
                question: "How many flats are in Ab major?",
                options: ["4", "3", "2", "5"],
                correctAnswer: "4",
                explanation: "Ab = Bb, Eb, Ab, Db."
            },
            {
                id: "q20",
                question: "What is the 4th degree of D major?",
                options: ["G", "A", "E", "F#"],
                correctAnswer: "G",
                explanation: "D-E-F#-G (fourth)."
            },
            {
                id: "q21",
                question: "Which minor scale has 1 sharp?",
                options: ["E minor", "A minor", "D minor", "G minor"],
                correctAnswer: "E minor",
                explanation: "E minor has F#."
            },
            {
                id: "q22",
                question: "Which scale is enharmonic to C# major?",
                options: ["Db major", "Eb major", "B major", "Gb major"],
                correctAnswer: "Db major",
                explanation: "C# = Db enharmonic."
            },
            {
                id: "q23",
                question: "What comes after A in the circle of fifths?",
                options: ["E", "D", "B", "F#"],
                correctAnswer: "E",
                explanation: "A → E (perfect 5th)."
            },
            {
                id: "q24",
                question: "What is the relative minor of E major?",
                options: ["C# minor", "F# minor", "G# minor", "D# minor"],
                correctAnswer: "C# minor",
                explanation: "6th degree of E = C#."
            },
            {
                id: "q25",
                question: "What is the subdominant of A major?",
                options: ["D", "E", "C#", "F#"],
                correctAnswer: "D",
                explanation: "4th degree = D."
            },
            {
                id: "q26",
                question: "Which scale has 6 sharps?",
                options: ["F# major", "E major", "B major", "C# major"],
                correctAnswer: "F# major",
                explanation: "F# major = 6 sharps."
            },
            {
                id: "q27",
                question: "What is the relative major of C minor?",
                options: ["Eb major", "G major", "Bb major", "F major"],
                correctAnswer: "Eb major",
                explanation: "C minor → Eb major."
            },
            {
                id: "q28",
                question: "What is the 6th degree of F major?",
                options: ["D", "C", "E", "G"],
                correctAnswer: "D",
                explanation: "F-G-A-Bb-C-D."
            },
            {
                id: "q29",
                question: "Which major scale has 5 flats?",
                options: ["Db major", "Ab major", "Eb major", "Gb major"],
                correctAnswer: "Db major",
                explanation: "Db = Bb, Eb, Ab, Db, Gb."
            },
            {
                id: "q30",
                question: "Which key is enharmonic to F# major?",
                options: ["Gb major", "Cb major", "Eb major", "Db major"],
                correctAnswer: "Gb major",
                explanation: "F# = Gb."
            },
            {
                id: "q31",
                question: "What is the mediant of C major?",
                options: ["E", "G", "A", "F"],
                correctAnswer: "E",
                explanation: "3rd degree = mediant."
            },
            {
                id: "q32",
                question: "What is the relative minor of B♭ major?",
                options: ["G minor", "B minor", "C minor", "D minor"],
                correctAnswer: "G minor",
                explanation: "Bb → G."
            },
            {
                id: "q33",
                question: "How many sharps are in the key of E major?",
                options: ["4", "3", "2", "5"],
                correctAnswer: "4",
                explanation: "E major = F#, C#, G#, D#."
            },
            {
                id: "q34",
                question: "What comes before D in the circle of fifths?",
                options: ["G", "A", "C", "E"],
                correctAnswer: "G",
                explanation: "G → D (up), so before D is G."
            },
            {
                id: "q35",
                question: "What is the supertonic of A major?",
                options: ["B", "C#", "F#", "E"],
                correctAnswer: "B",
                explanation: "2nd degree = B."
            }
        ];
        
        
        
        this.init();
    }

    init() {
        this.loadProgress();
        this.render();
        this.attachEventListeners();
    }

    loadProgress() {
        const progress = getSectionProgress('scaleProgression');
        this.score = progress.score || 0;
        this.totalQuestions = progress.totalQuestions || 0;
        this.correctAnswers = progress.correctAnswers || 0;
        this.completedQuestions = progress.completedQuestions || [];
        this.updateScoreDisplay();
    }

    saveProgress() {
        updateProgress('scaleProgression', {
            score: this.score,
            totalQuestions: this.totalQuestions,
            correctAnswers: this.correctAnswers,
            completedQuestions: this.completedQuestions
        });
    }

    /**
     * Set the question bank data
     * @param {Array} questions - Array of question objects
     */
    setQuestionBank(questions) {
        this.questionBank = questions;
        this.totalQuestions = questions.length;
        this.saveProgress();
    }

    /**
     * Get the next unanswered question
     */
    getNextQuestion() {
        // Filter out completed questions
        const availableQuestions = this.questionBank.filter(
            q => !this.completedQuestions.includes(q.id)
        );

        if (availableQuestions.length === 0) {
            // All questions completed, reset or show completion message
            return null;
        }

        return getRandomElement(availableQuestions);
    }

    /**
     * Load and display a question
     */
    loadQuestion() {
        this.currentQuestion = this.getNextQuestion();
        
        if (!this.currentQuestion) {
            this.showCompletionMessage();
            return;
        }

        this.answerOptions = this.currentQuestion.options 
            ? shuffleArray([...this.currentQuestion.options])
            : [];
        
        this.render();
    }

    /**
     * Handle answer selection
     * @param {string} selectedAnswer - The selected answer
     */
    handleAnswer(selectedAnswer) {
        if (!this.currentQuestion) return;

        const isCorrect = selectedAnswer === this.currentQuestion.correctAnswer;
        
        if (isCorrect) {
            this.correctAnswers++;
            this.score++;
        }

        // Mark question as completed
        if (!this.completedQuestions.includes(this.currentQuestion.id)) {
            this.completedQuestions.push(this.currentQuestion.id);
        }

        this.showFeedback(isCorrect, selectedAnswer);
        this.saveProgress();
        this.updateScoreDisplay();

        // Disable all buttons
        const buttons = document.querySelectorAll('#progression-answers .answer-btn');
        buttons.forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === this.currentQuestion.correctAnswer) {
                btn.classList.add('correct');
            } else if (btn.textContent === selectedAnswer && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });

        // Show next question button
        const nextBtn = document.getElementById('next-question-btn');
        if (nextBtn) {
            nextBtn.style.display = 'block';
        }
    }

    showFeedback(isCorrect, selectedAnswer) {
        const feedbackEl = document.getElementById('progression-feedback');
        if (feedbackEl) {
            feedbackEl.textContent = isCorrect 
                ? `Correct! ${this.currentQuestion.explanation || ''}`
                : `Incorrect. The correct answer is ${this.currentQuestion.correctAnswer}. ${this.currentQuestion.explanation || ''}`;
            feedbackEl.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        }
    }

    updateScoreDisplay() {
        const scoreEl = document.getElementById('progression-score');
        const totalEl = document.getElementById('progression-total');
        
        if (scoreEl) {
            scoreEl.textContent = this.score;
        }
        if (totalEl) {
            totalEl.textContent = this.totalQuestions;
        }
    }

    showCompletionMessage() {
        const questionEl = document.getElementById('progression-question');
        const answersEl = document.getElementById('progression-answers');
        const nextBtn = document.getElementById('next-question-btn');
        const feedbackEl = document.getElementById('progression-feedback');

        if (questionEl) {
            questionEl.textContent = `Quiz Complete! You answered ${this.correctAnswers} out of ${this.totalQuestions} questions correctly.`;
        }
        
        if (answersEl) {
            answersEl.innerHTML = '';
        }
        
        if (nextBtn) {
            nextBtn.style.display = 'none';
        }

        if (feedbackEl) {
            feedbackEl.textContent = '';
            feedbackEl.className = 'feedback';
        }
    }

    render() {
        const questionEl = document.getElementById('progression-question');
        const answersEl = document.getElementById('progression-answers');
        const nextBtn = document.getElementById('next-question-btn');

        if (!questionEl || !answersEl) return;

        if (!this.currentQuestion) {
            this.loadQuestion();
            return;
        }

        questionEl.textContent = this.currentQuestion.question;

        answersEl.innerHTML = this.answerOptions.map(answer => 
            `<button class="answer-btn" data-answer="${answer}">${answer}</button>`
        ).join('');

        // Clear feedback and hide next button
        const feedbackEl = document.getElementById('progression-feedback');
        if (feedbackEl) {
            feedbackEl.textContent = '';
            feedbackEl.className = 'feedback';
        }
        
        if (nextBtn) {
            nextBtn.style.display = 'none';
        }
    }

    attachEventListeners() {
        // Use event delegation for dynamically created buttons
        const answersContainer = document.getElementById('progression-answers');
        if (answersContainer) {
            answersContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('answer-btn') && !e.target.disabled) {
                    const answer = e.target.getAttribute('data-answer');
                    this.handleAnswer(answer);
                }
            });
        }

        const nextBtn = document.getElementById('next-question-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.loadQuestion();
            });
        }
    }

    reset() {
        this.score = 0;
        this.correctAnswers = 0;
        this.completedQuestions = [];
        this.saveProgress();
        this.updateScoreDisplay();
        this.loadQuestion();
    }
}

// Global instance (will be initialized in main.js)
let scaleProgressionQuiz = null;

