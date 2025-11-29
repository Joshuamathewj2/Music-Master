/**
 * Flashcard Component
 * Handles flashcard creation, flipping, and navigation
 */

class FlashcardManager {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.cards = [];
        this.currentIndex = 0;
        this.shuffleMode = false;
        this.originalOrder = [];
        
        // TODO: Replace with actual scale data
        // Expected format: [{ id: 'c-major', root: 'C', type: 'major', notes: ['C', 'D', 'E', ...] }, ...]
        this.scaleData = [
            // 🌟 MAJOR SCALES
            { id: "c-major", root: "C", type: "major", notes: ["C", "D", "E", "F", "G", "A", "B"] },
            { id: "g-major", root: "G", type: "major", notes: ["G", "A", "B", "C", "D", "E", "F#"] },
            { id: "d-major", root: "D", type: "major", notes: ["D", "E", "F#", "G", "A", "B", "C#"] },
            { id: "a-major", root: "A", type: "major", notes: ["A", "B", "C#", "D", "E", "F#", "G#"] },
            { id: "e-major", root: "E", type: "major", notes: ["E", "F#", "G#", "A", "B", "C#", "D#"] },
            { id: "b-major", root: "B", type: "major", notes: ["B", "C#", "D#", "E", "F#", "G#", "A#"] },
            { id: "fsharp-major", root: "F#", type: "major", notes: ["F#", "G#", "A#", "B", "C#", "D#", "E#"] },
            { id: "csharp-major", root: "C#", type: "major", notes: ["C#", "D#", "E#", "F#", "G#", "A#", "B#"] },
        
            // 🌟 FLAT MAJOR SCALES
            { id: "f-major", root: "F", type: "major", notes: ["F", "G", "A", "Bb", "C", "D", "E"] },
            { id: "bb-major", root: "Bb", type: "major", notes: ["Bb", "C", "D", "Eb", "F", "G", "A"] },
            { id: "eb-major", root: "Eb", type: "major", notes: ["Eb", "F", "G", "Ab", "Bb", "C", "D"] },
            { id: "ab-major", root: "Ab", type: "major", notes: ["Ab", "Bb", "C", "Db", "Eb", "F", "G"] },
            { id: "db-major", root: "Db", type: "major", notes: ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"] },
            { id: "gb-major", root: "Gb", type: "major", notes: ["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "F"] },
            { id: "cb-major", root: "Cb", type: "major", notes: ["Cb", "Db", "Eb", "Fb", "Gb", "Ab", "Bb"] },
        
            // 🌙 NATURAL MINOR SCALES (NO harmonic/melodic)
            { id: "a-minor", root: "A", type: "minor", notes: ["A", "B", "C", "D", "E", "F", "G"] },
            { id: "e-minor", root: "E", type: "minor", notes: ["E", "F#", "G", "A", "B", "C", "D"] },
            { id: "b-minor", root: "B", type: "minor", notes: ["B", "C#", "D", "E", "F#", "G", "A"] },
            { id: "fsharp-minor", root: "F#", type: "minor", notes: ["F#", "G#", "A", "B", "C#", "D", "E"] },
            { id: "csharp-minor", root: "C#", type: "minor", notes: ["C#", "D#", "E", "F#", "G#", "A", "B"] },
            { id: "gsharp-minor", root: "G#", type: "minor", notes: ["G#", "A#", "B", "C#", "D#", "E", "F#"] },
            { id: "dsharp-minor", root: "D#", type: "minor", notes: ["D#", "E#", "F#", "G#", "A#", "B", "C#"] },
        
            // 🌙 FLAT MINOR SCALES
            { id: "d-minor", root: "D", type: "minor", notes: ["D", "E", "F", "G", "A", "Bb", "C"] },
            { id: "g-minor", root: "G", type: "minor", notes: ["G", "A", "Bb", "C", "D", "Eb", "F"] },
            { id: "c-minor", root: "C", type: "minor", notes: ["C", "D", "Eb", "F", "G", "Ab", "Bb"] },
            { id: "f-minor", root: "F", type: "minor", notes: ["F", "G", "Ab", "Bb", "C", "Db", "Eb"] },
            { id: "bb-minor", root: "Bb", type: "minor", notes: ["Bb", "C", "Db", "Eb", "F", "Gb", "Ab"] },
            { id: "eb-minor", root: "Eb", type: "minor", notes: ["Eb", "F", "Gb", "Ab", "Bb", "Cb", "Db"] },
            { id: "ab-minor", root: "Ab", type: "minor", notes: ["Ab", "Bb", "Cb", "Db", "Eb", "Fb", "Gb"] }
        ];
        
        
        this.init();
    }

    init() {
        this.loadProgress();
        this.render();
        this.attachEventListeners();
    }

    loadProgress() {
        const progress = getSectionProgress('scales');
        this.currentIndex = progress.currentIndex || 0;
        this.shuffleMode = progress.shuffleMode || false;
    }

    saveProgress() {
        updateProgress('scales', {
            currentIndex: this.currentIndex,
            shuffleMode: this.shuffleMode
        });
    }

    /**
     * Set the scale data
     * @param {Array} data - Array of scale objects
     */
    setScaleData(data) {
        this.scaleData = data;
        this.originalOrder = [...data];
        this.resetCards();
    }

    resetCards() {
        if (this.shuffleMode) {
            this.cards = shuffleArray([...this.scaleData]);
        } else {
            this.cards = [...this.scaleData];
        }
        this.currentIndex = 0;
        this.render();
        this.saveProgress();
    }

    shuffle() {
        this.shuffleMode = !this.shuffleMode;
        this.resetCards();
        this.saveProgress();
    }

    render() {
        if (this.cards.length === 0) {
            this.container.innerHTML = '<p style="text-align: center; color: var(--text-light);">No flashcards available. Add scale data to get started.</p>';
            return;
        }

        const currentCard = this.cards[this.currentIndex];
        if (!currentCard) {
            this.container.innerHTML = '<p style="text-align: center; color: var(--text-light);">No more cards available.</p>';
            return;
        }

        this.container.innerHTML = this.createCardHTML(currentCard);
        this.updateCardCounter();
        this.attachCardListeners();
    }

    createCardHTML(card) {
        // TODO: Customize card content based on your data structure
        const frontContent = `
            <div class="flashcard-label">Scale</div>
            <div class="flashcard-main">${card.root || 'C'} ${card.type || 'Major'}</div>
        `;
        
        const backContent = `
            <div class="flashcard-label">Notes</div>
            <div class="flashcard-main">${(card.notes || []).join(' - ') || 'Add notes data'}</div>
        `;

        return `
            <div class="flashcard" id="current-flashcard">
                <div class="flashcard-face flashcard-front">
                    <div class="flashcard-content">
                        ${frontContent}
                    </div>
                </div>
                <div class="flashcard-face flashcard-back">
                    <div class="flashcard-content">
                        ${backContent}
                    </div>
                </div>
            </div>
            <div class="flashcard-navigation">
                <button class="nav-arrow" id="prev-card" ${this.currentIndex === 0 ? 'disabled' : ''}>← Previous</button>
                <button class="nav-arrow" id="next-card" ${this.currentIndex === this.cards.length - 1 ? 'disabled' : ''}>Next →</button>
            </div>
        `;
    }

    attachCardListeners() {
        const card = document.getElementById('current-flashcard');
        if (card) {
            card.addEventListener('click', () => this.flipCard());
        }

        const prevBtn = document.getElementById('prev-card');
        const nextBtn = document.getElementById('next-card');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousCard());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextCard());
        }
    }

    flipCard() {
        const card = document.getElementById('current-flashcard');
        if (card) {
            card.classList.toggle('flipped');
        }
    }

    nextCard() {
        if (this.currentIndex < this.cards.length - 1) {
            this.currentIndex++;
            this.render();
            this.saveProgress();
        }
    }

    previousCard() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.render();
            this.saveProgress();
        }
    }

    updateCardCounter() {
        const counter = document.getElementById('card-counter');
        if (counter) {
            counter.textContent = `Card ${this.currentIndex + 1} of ${this.cards.length}`;
        }
    }

    attachEventListeners() {
        const shuffleBtn = document.getElementById('shuffle-btn');
        const resetBtn = document.getElementById('reset-btn');

        if (shuffleBtn) {
            shuffleBtn.addEventListener('click', () => {
                this.shuffle();
                shuffleBtn.textContent = this.shuffleMode ? 'Unshuffle' : 'Shuffle';
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.currentIndex = 0;
                this.render();
                this.saveProgress();
            });
        }
    }
}

// Global instance (will be initialized in main.js)
let flashcardManager = null;

